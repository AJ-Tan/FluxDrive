import useAuth from "../context/AuthContext/useAuth";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const { user } = useAuth();
  if (user) return <Navigate to="/app" replace />;

  return <Outlet />;
}

export default PublicRoute;
