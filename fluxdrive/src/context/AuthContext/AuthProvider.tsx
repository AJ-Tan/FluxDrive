import { useEffect, useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../types/auth.types";
import { fetch_authUser } from "../../services/auth-service";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage loadingText="Preparing backend..." />;
  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}

export default AuthProvider;
