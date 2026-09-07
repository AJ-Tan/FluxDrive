import Button from "../../../../components/Buttons/Button";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import useApp from "../../../../context/AppContext/useApp";
import useAuth from "../../../../context/AuthContext/useAuth";
import { fetch_authSignOut } from "../../../../services/auth-service";
import "./appHeader.css";
import Searchbar from "./components/Searchbar/Searchbar";

function AppHeader() {
  const { setUser, setAuthLoading } = useAuth();
  const { setError } = useApp();
  const handleLogout = async () => {
    setAuthLoading("Logging out...");
    const res = await fetch_authSignOut();
    if (!res.ok) {
      setError({ status: res.status, message: res.message });
      return console.log(res);
    }
    setAuthLoading(null);
    setUser(null);
  };

  return (
    <>
      <PageLogo />
      <Searchbar />
      <div className="app-header-controls">
        <Button onClick={handleLogout} scale={1}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default AppHeader;
