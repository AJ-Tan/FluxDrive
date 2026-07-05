import type { RouteObject } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/HomePage/HomePage";
import SigninPage from "../pages/SigninPage/SigninPage";
import SignupPage from "../pages/SignupPage/SignupPage";

export const routes: RouteObject[] = [
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SigninPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
];
