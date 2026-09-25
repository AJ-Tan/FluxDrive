import { useEffect, useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../types/auth.types";
import { fetch_authUser } from "../../services/auth-service";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

// Global auth state provider.
// This component fetches the current authenticated user once on app startup and exposes it to the rest of the UI.
function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authLoading, setAuthLoading] = useState<string | null>(
    "Loading node...",
  );

  useEffect(() => {
    fetch_authUser()
      .then((res) => {
        if (res.ok) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAuthLoading(null);
      });
  }, []);

  if (authLoading) return <LoadingPage loadingText={authLoading} />;
  return (
    <AuthContext value={{ user, setUser, setAuthLoading }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
