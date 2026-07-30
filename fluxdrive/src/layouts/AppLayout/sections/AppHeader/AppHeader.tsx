import Button from "../../../../components/Buttons/Button";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import useAuth from "../../../../context/AuthContext/useAuth";
import { auth_signOut } from "../../../../services/auth-service";
import "./appHeader.css";

function AppHeader() {
  const auth = useAuth();
  const handleLogout = async () => {
    const result = await auth_signOut();
    if (!result.ok) return console.log(result);

    auth.setUser(null);
  };

  return (
    <header className="app-header">
      <PageLogo />
      <div className="app-header-controls">
        <div className="user-details">
          <div className="user-icon">{auth.user?.firstName[0]}</div>
          <span>{`${auth.user?.firstName} ${auth.user?.lastName}`}</span>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}

export default AppHeader;
