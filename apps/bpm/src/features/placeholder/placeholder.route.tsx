import { RouteObject } from "react-router-dom";
import PlaceholderPage from "./PlaceholderPage";

export const placeholderRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PlaceholderPage />,
  },
  {
    path: "*",
    element: <PlaceholderPage />,
  },
];
