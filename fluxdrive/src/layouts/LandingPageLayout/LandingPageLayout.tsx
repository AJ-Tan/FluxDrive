import type { JSX } from "react/jsx-runtime";
import "./landingPageLayout.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function LandingPageLayout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <div className="landing-page-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
