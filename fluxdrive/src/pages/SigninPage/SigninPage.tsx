import { useState } from "react";
import { Link } from "react-router";
import { auth_signIn } from "../../services/auth-service";
import useAuth from "../../context/AuthContext/useAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await auth_signIn(email, password);
    if (!result.ok) return console.log(result);

    localStorage.setItem("accessToken", result.data.accessToken);
    auth.setUser(result.data.user);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link to="/signup">Create an account.</Link>
        <button type="submit">Signin</button>
      </form>
    </AuthLayout>
  );
}

export default SigninPage;
