import type { JSX } from "react/jsx-runtime";
import "./authLayout.css";
import PageLogo from "../../components/PageLogo/PageLogo";

function AuthLayout({
  loading,
  children,
}: {
  loading: boolean;
  children: JSX.Element;
}) {
  return (
    <div className="auth-layout">
      <div className={`content${loading ? " loading" : ""}`}>
        <PageLogo />
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
