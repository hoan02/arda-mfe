import { useRouterContext } from '../contexts/router-context';

// Hook that provides the same API as useNavigate from react-router-dom
export function useNavigate() {
  const { useNavigate: routerNavigate } = useRouterContext();
  return routerNavigate();
}

// Hook that provides the same API as useLocation from react-router-dom
export function useLocation() {
  const { useLocation: routerLocation } = useRouterContext();
  return routerLocation();
}
