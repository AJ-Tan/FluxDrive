import { useEffect, useState, type JSX } from "react";
import { AuthContext } from "./AuthContext";
import type { UserType } from "../../types/auth.types";
import { auth_user } from "../../services/auth-service";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";

function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem("accessToken")) return setLoading(false);

    auth_user()
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
  }, [setUser, setLoading]);

  if (loading) return <LoadingPage loadingText="Preparing backend..." />;
  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}

export default AuthProvider;
