import useAuth from "../context/AuthContext/useAuth";
import { Navigate, Outlet } from "react-router";

// Prevents logged-in users from opening public auth pages.
// If a user is already authenticated, they are sent into the app instead.
function PublicRoute() {
  const { user } = useAuth();
  if (user) return <Navigate to="/app" replace />;

  return <Outlet />;
}

export default PublicRoute;
