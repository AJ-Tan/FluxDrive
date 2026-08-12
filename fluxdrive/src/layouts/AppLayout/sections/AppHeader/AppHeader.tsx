import Button from "../../../../components/Buttons/Button";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import useAuth from "../../../../context/AuthContext/useAuth";
import { auth_signOut } from "../../../../services/auth-service";
import "./appHeader.css";
import Searchbar from "./components/Searchbar/Searchbar";

function AppHeader() {
  const auth = useAuth();
  const handleLogout = async () => {
    const result = await auth_signOut();
    if (!result.ok) return console.log(result);

    auth.setUser(null);
  };

  return (
    <>
      <PageLogo />
      <Searchbar />
      <div className="app-header-controls">
        <div className="user-details">
          <span>{`${auth.user?.firstName} ${auth.user?.lastName}`}!</span>
        </div>

        <Button onClick={handleLogout} scale={1}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default AppHeader;
