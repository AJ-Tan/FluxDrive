import PageLogo from "../../components/PageLogo/PageLogo";
import LandingPageLayout from "../../layouts/LandingPageLayout/LandingPageLayout";
import heroImg from "../../assets/landing-page/img-hero.png";
import "./landingPage.css";

function LandingPage() {
  return (
    <LandingPageLayout>
      <section className="page-hero">
        <div className="page-hero-content">
          <PageLogo />
          <h1>Store and share files online</h1>
          <p>
            Secure cloud storage for seamless file sharing and enhanced
            collaboration
          </p>
          <div className="page-hero-controls">
            <button className="btn btn--primary scale-1" type="button">
              Sign in
            </button>
            <button className="btn btn--secondary scale-1" type="button">
              Sign up
            </button>
          </div>
        </div>
        <div className="page-hero-image">
          <img src={heroImg} alt="" />
        </div>
      </section>
    </LandingPageLayout>
  );
}

export default LandingPage;
