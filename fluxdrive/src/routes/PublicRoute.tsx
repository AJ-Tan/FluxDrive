import type { JSX } from "react/jsx-runtime";
import useAuth from "../context/AuthContext/useAuth";
import { Navigate } from "react-router";

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" replace />;

  return children;
}

export default PublicRoute;
