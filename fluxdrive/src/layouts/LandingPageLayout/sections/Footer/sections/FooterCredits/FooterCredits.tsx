import { Link } from "react-router";
import "./footerCredits.css";

function FooterCredits() {
  return (
    <section className="footer-credits">
      <p>
        Developed by{" "}
        <Link
          to="https://github.com/AJ-Tan"
          target="_blank"
          className="highlight"
        >
          Aldomin Joseph R. Tan
        </Link>
      </p>
    </section>
  );
}

export default FooterCredits;
