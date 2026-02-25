/**
 * Auth API — handles login, token refresh, tenant lookup, and SSO redirect
 * Backend: Central Platform via APISIX Gateway
 */

import {
  getRefreshToken,
  getTenantKey,
  setTokens,
  setTenantKey,
  setCodeVerifier,
  getCodeVerifier,
  clearCodeVerifier,
  type TenantInfo,
} from './auth-store';

// Default API base — overridden by env
const DEFAULT_BASE_URL = 'http://localhost:9080';
const CENTRAL_API_PREFIX = '/api/central/v1';

// Keycloak defaults
const KEYCLOAK_BASE_URL = 'http://localhost:8081';
const CLIENT_ID = 'arda-shell';
const SCOPE = 'openid profile email';

function getBaseUrl(): string {
  // Support both Vite and process.env
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) {
    return (import.meta as any).env.VITE_API_BASE_URL;
  }
  return DEFAULT_BASE_URL;
}

function getKeycloakUrl(): string {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_KEYCLOAK_URL) {
    return (import.meta as any).env.VITE_KEYCLOAK_URL;
  }
  return KEYCLOAK_BASE_URL;
}

// ── Tenant Lookup ──

export async function fetchTenantInfo(key: string): Promise<TenantInfo> {
  const url = `${getBaseUrl()}${CENTRAL_API_PREFIX}/public/tenants/info/${key}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Mã doanh nghiệp không tồn tại');
    }
    throw new Error('Lỗi kết nối đến server. Vui lòng thử lại.');
  }

  return response.json();
}

// ── Credentials Login ──

export async function loginWithCredentials(
  username: string,
  password: string,
  tenantKey: string
): Promise<void> {
  const url = `${getBaseUrl()}${CENTRAL_API_PREFIX}/public/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, tenantKey }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Tài khoản hoặc mật khẩu không chính xác');
  }

  const tokenData = await response.json();
  setTokens(tokenData.access_token, tokenData.refresh_token);
  setTenantKey(tenantKey);
}

// ── Token Refresh ──

export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  const tenantKey = getTenantKey();

  if (!refreshToken || !tenantKey) return false;

  try {
    const url = `${getBaseUrl()}${CENTRAL_API_PREFIX}/public/auth/refresh`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken, tenantKey }),
    });

    if (!response.ok) return false;

    const tokenData = await response.json();
    setTokens(tokenData.access_token, tokenData.refresh_token);
    return true;
  } catch {
    return false;
  }
}

// ── SSO / Keycloak PKCE ──

function base64UrlEncode(array: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

export async function redirectToSSO(tenantKey: string): Promise<void> {
  setTenantKey(tenantKey);

  const codeVerifier = generateCodeVerifier();
  setCodeVerifier(codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const redirectUri = `${window.location.origin}/auth/callback`;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    scope: SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `${getKeycloakUrl()}/realms/${tenantKey}/protocol/openid-connect/auth?${params}`;
}

export async function handleOAuthCallback(code: string): Promise<void> {
  const tenantKey = getTenantKey();
  const codeVerifier = getCodeVerifier();

  if (!tenantKey || !codeVerifier) {
    throw new Error('Missing tenant key or code verifier');
  }

  const tokenUrl = `${getKeycloakUrl()}/realms/${tenantKey}/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code,
    redirect_uri: `${window.location.origin}/auth/callback`,
    code_verifier: codeVerifier,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const tokenData = await response.json();
  setTokens(tokenData.access_token, tokenData.refresh_token);
  clearCodeVerifier();
}
