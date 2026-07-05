import useAuth from "../../context/AuthContext/useAuth";
import { auth_signOut } from "../../services/auth-service";

function HomePage() {
  const auth = useAuth();
  const handleLogout = async () => {
    const result = await auth_signOut();
    if (!result.ok) return console.log(result);

    auth.setUser(null);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
