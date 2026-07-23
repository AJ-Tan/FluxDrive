import "./footer.css";
import FooterCredits from "./sections/FooterCredits/FooterCredits";
import FooterSiteMaps from "./sections/FooterSiteMaps/FooterSiteMaps";
import FooterSocials from "./sections/FooterSocials/FooterSocials";

function Footer() {
  return (
    <footer>
      <div className="content">
        <FooterSocials />
        <FooterSiteMaps />
        <FooterCredits />
      </div>
    </footer>
  );
}

export default Footer;
