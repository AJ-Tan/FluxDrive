import type { JSX } from "react/jsx-runtime";
import "./landingPageLayout.css";
import PageLogo from "../../components/PageLogo/PageLogo";

function LandingPageLayout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <div className="landing-page-layout">
      <header className="landing-page-header">
        <PageLogo />
        <nav className="page-nav">
          <ul>
            <li className="selected">
              <a href="#">Solutions</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Industries</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </nav>
        <div className="page-header-controls">
          <button className="btn btn--secondary" type="button">
            Sign up
          </button>
          <button className="btn btn--primary" type="button">
            Sign in
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <span>Made by: Aldomin Joseph R. Tan</span>
      </footer>
    </div>
  );
}

export default LandingPageLayout;
