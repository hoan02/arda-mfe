/**
 * AuthStore — localStorage-backed token and tenant manager
 * Used across shell and all MFE apps for consistent auth state
 */

// JWT Payload structure (Keycloak-compatible)
export interface JwtPayload {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  tenant_id?: string;
  preferred_username?: string;
  email?: string;
  realm_access?: {
    roles: string[];
  };
}

// Tenant info from Central Platform API
export interface TenantInfo {
  key: string;
  name: string;
  logo: string;
  primaryColor: string;
  dbType?: string;
}

// Storage keys
const STORAGE_TOKEN = 'arda_token';
const STORAGE_REFRESH_TOKEN = 'arda_refresh_token';
const STORAGE_TENANT_KEY = 'arda_tenant_key';
const STORAGE_TENANT_INFO = 'arda_tenant_info';
const STORAGE_CODE_VERIFIER = 'pkce_code_verifier';

// ── Token Management ──

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_REFRESH_TOKEN);
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  localStorage.setItem(STORAGE_TOKEN, accessToken);
  if (refreshToken) {
    localStorage.setItem(STORAGE_REFRESH_TOKEN, refreshToken);
  }
}

export function clearTokens(): void {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_CODE_VERIFIER);
}

// ── Tenant Management ──

export function getTenantKey(): string | null {
  return localStorage.getItem(STORAGE_TENANT_KEY);
}

export function setTenantKey(key: string): void {
  localStorage.setItem(STORAGE_TENANT_KEY, key);
}

export function getTenantInfo(): TenantInfo | null {
  try {
    const stored = localStorage.getItem(STORAGE_TENANT_INFO);
    return stored ? (JSON.parse(stored) as TenantInfo) : null;
  } catch {
    localStorage.removeItem(STORAGE_TENANT_INFO);
    return null;
  }
}

export function setTenantInfo(tenant: TenantInfo): void {
  localStorage.setItem(STORAGE_TENANT_INFO, JSON.stringify(tenant));
}

export function clearTenant(): void {
  localStorage.removeItem(STORAGE_TENANT_KEY);
  localStorage.removeItem(STORAGE_TENANT_INFO);
}

export function clearAll(): void {
  clearTokens();
  clearTenant();
}

// ── JWT Decode ──

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payload.length % 4 !== 0) payload += '=';

    const decoded = atob(payload);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }

    return JSON.parse(new TextDecoder('utf-8').decode(bytes)) as JwtPayload;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) return false;

  return payload.exp > Math.floor(Date.now() / 1000);
}

// ── PKCE Helpers ──

export function getCodeVerifier(): string | null {
  return localStorage.getItem(STORAGE_CODE_VERIFIER);
}

export function setCodeVerifier(verifier: string): void {
  localStorage.setItem(STORAGE_CODE_VERIFIER, verifier);
}

export function clearCodeVerifier(): void {
  localStorage.removeItem(STORAGE_CODE_VERIFIER);
}
