import React from "react";
import {
  useLocation as useRouterLocation,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import {
  RouterProvider,
  RouterContextValue,
} from "@workspace/shared/contexts/router-context";

interface RouterAdapterProps {
  children: React.ReactNode;
}

export function RouterAdapter({ children } : RouterAdapterProps) {
  const location = useRouterLocation();
  const navigate = useRouterNavigate();

  const routerValue: RouterContextValue = {
    navigate: (to: string, options?: { replace?: boolean }) => {
      navigate(to, options);
    },
    location: {
      pathname: location.pathname,
      search: location.search,
    },
    useLocation: () => ({
      pathname: location.pathname,
      search: location.search,
    }),
    useNavigate: () => (to: string, options?: { replace?: boolean }) => {
      navigate(to, options);
    },
  };

  return <RouterProvider value={routerValue}>{children}</RouterProvider>;
}
