import useAuth from "../context/AuthContext/useAuth";
import { Navigate, Outlet } from "react-router";

// Protects authenticated-only routes.
// If no user exists, the app redirects the user to the sign-in page.
function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default PrivateRoute;
