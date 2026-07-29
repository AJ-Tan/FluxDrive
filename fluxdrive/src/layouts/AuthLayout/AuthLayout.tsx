import type { JSX } from "react/jsx-runtime";
import "./authLayout.css";
import PageLogo from "../../components/PageLogo/PageLogo";

function AuthLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="auth-layout">
      <div className="content">
        <PageLogo />
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
