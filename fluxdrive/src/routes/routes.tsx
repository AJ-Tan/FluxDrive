import type { RouteObject } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AppPage from "../pages/AppPage/AppPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import AppLayout from "../layouts/AppLayout/AppLayout";
import ShareLayout from "../layouts/ShareLayout/ShareLayout";
import SharePage from "../pages/SharePage/SharePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/app",
        element: (
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/app/folders/",
        element: (
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/app/folders/:folderid",
        element: (
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/shared",
    element: <ShareLayout />,
    children: [
      {
        path: "/shared/:shareid",
        element: <SharePage />,
      },
      {
        path: "/shared/:shareid/:folderid",
        element: <SharePage />,
      },
    ],
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
