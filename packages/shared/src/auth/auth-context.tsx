import React, {
  createContext,
  use,
  useState,
  useEffect,
  useCallback,
  useTransition,
  type ReactNode,
} from "react";
import {
  isAuthenticated as checkAuth,
  getToken,
  decodeToken,
  getTenantInfo as loadTenantInfo,
  setTenantInfo as saveTenantInfo,
  clearAll,
  type TenantInfo,
  type JwtPayload,
} from "./auth-store";
import {
  fetchTenantInfo,
  loginWithCredentials as apiLogin,
  redirectToSSO as apiRedirectSSO,
  handleOAuthCallback as apiHandleCallback,
} from "./auth-api";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  tenant: TenantInfo | null;
  isPending: boolean;
  login: (
    username: string,
    password: string,
    tenantKey: string,
  ) => Promise<void>;
  loginSSO: (tenantKey: string) => Promise<void>;
  handleCallback: (code: string) => Promise<void>;
  lookupTenant: (key: string) => Promise<TenantInfo>;
  setTenant: (tenant: TenantInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(() => checkAuth());
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = getToken();
    return token ? decodeToken(token) : null;
  });
  const [tenant, setTenantState] = useState<TenantInfo | null>(() =>
    loadTenantInfo(),
  );
  // React 19: useTransition for async state transitions
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setAuthenticated(checkAuth());
    const token = getToken();
    if (token) setUser(decodeToken(token));
    setTenantState(loadTenantInfo());
  }, []);

  const setTenant = useCallback((t: TenantInfo) => {
    setTenantState(t);
    saveTenantInfo(t);
  }, []);

  const lookupTenant = useCallback(
    async (key: string): Promise<TenantInfo> => {
      const info = await fetchTenantInfo(key);
      setTenant(info);
      return info;
    },
    [setTenant],
  );

  const login = useCallback(
    async (username: string, password: string, tenantKey: string) => {
      await apiLogin(username, password, tenantKey);
      const token = getToken();
      if (token) setUser(decodeToken(token));
      setAuthenticated(true);
    },
    [],
  );

  const loginSSO = useCallback(async (tenantKey: string) => {
    await apiRedirectSSO(tenantKey);
  }, []);

  const handleCallback = useCallback(async (code: string) => {
    await apiHandleCallback(code);
    const token = getToken();
    if (token) setUser(decodeToken(token));
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearAll();
    setAuthenticated(false);
    setUser(null);
    setTenantState(null);
  }, []);

  return (
    <AuthContext
      value={{
        isAuthenticated: authenticated,
        user,
        tenant,
        isPending,
        login,
        loginSSO,
        handleCallback,
        lookupTenant,
        setTenant,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}

/**
 * React 19: use() hook instead of useContext()
 */
export function useAuth(): AuthContextValue {
  const ctx = use(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
