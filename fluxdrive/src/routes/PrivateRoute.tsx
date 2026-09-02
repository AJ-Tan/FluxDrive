import useAuth from "../context/AuthContext/useAuth";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default PrivateRoute;
