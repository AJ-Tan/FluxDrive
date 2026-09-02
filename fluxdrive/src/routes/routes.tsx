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
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: (
      <ErrorPage
        defaultUrl="/"
        status={404}
        message="The requested URL was not found on this server."
      />
    ),
  },
  {
    path: "/share",
    element: <ShareLayout />,
    children: [
      {
        path: "/share/:shareid",
        element: <SharePage />,
      },
      {
        path: "/share/:shareid/:folderid",
        element: <SharePage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "/app",
            element: <AppPage />,
          },
          {
            path: "/app/folders/",
            element: <AppPage />,
          },
          {
            path: "/app/folders/:folderid",
            element: <AppPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
];
