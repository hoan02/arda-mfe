import React, { createContext, useContext, ReactNode } from "react";

// Define the router interface that UI components expect
export interface RouterContextValue {
  navigate: (to: string, options?: { replace?: boolean }) => void;
  location: {
    pathname: string;
    search: string;
  };
  useLocation: () => {
    pathname: string;
    search: string;
  };
  useNavigate: () => (to: string, options?: { replace?: boolean }) => void;
}

// Create the context
const RouterContext = createContext<RouterContextValue | null>(null);

// Provider component
export interface RouterProviderProps {
  children: ReactNode;
  value: RouterContextValue;
}

export function RouterProvider({ children, value }: RouterProviderProps) {
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

// Hook to use the router context
export function useRouterContext(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
}
