import LinkButton from "../../../../components/Buttons/LinkButton";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import heroImg from "../../../../assets/landing-page/hero-image.png";
import "./heroSection.css";

function HeroSection() {
  return (
    <section id="home" className="page-hero">
      <div className="page-hero-content">
        <PageLogo />
        <h1>Store and share files online</h1>
        <p>
          Secure cloud storage for seamless file sharing and enhanced
          collaboration
        </p>
        <div className="page-hero-controls">
          <LinkButton to="/signin" scale={2}>
            Sign in
          </LinkButton>
          <LinkButton to="/signup" variants="secondary" scale={2}>
            Sign up
          </LinkButton>
        </div>
      </div>
      <div className="page-hero-image">
        <img src={heroImg} alt="" />
      </div>
    </section>
  );
}

export default HeroSection;
