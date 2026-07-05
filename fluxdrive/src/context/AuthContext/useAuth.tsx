import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth has been used outside of its context.");

  return context;
}

export default useAuth;
