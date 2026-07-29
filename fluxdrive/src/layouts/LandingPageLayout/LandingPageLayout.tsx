import type { JSX } from "react/jsx-runtime";
import "./landingPageLayout.css";
import Footer from "./sections/Footer/Footer";
import Header from "./sections/Header/Header";

function LandingPageLayout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <div className={`landing-page-layout`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
