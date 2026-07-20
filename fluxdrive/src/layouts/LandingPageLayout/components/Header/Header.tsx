import { useEffect } from "react";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import { Link, useLocation, useNavigate } from "react-router";
import LinkButton from "../../../../components/Buttons/LinkButton";

const navList = [
  {
    text: "Home",
    to: "#home",
  },
  {
    text: "Store",
    to: "#store",
  },
  {
    text: "Collaboration",
    to: "#collaboration",
  },
  {
    text: "Customer",
    to: "#customer",
  },
  {
    text: "FAQs",
    to: "#faqs",
  },
];

function Header() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  // Scroll to section when nav link is clicked
  useEffect(() => {
    if (hash) {
      if (!hash) return;

      const element = document.getElementById(hash.replace("#", ""));
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Visible portion of the element
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      const visibleRatio = Math.max(
        0,
        visibleHeight / Math.min(rect.height, viewportHeight),
      );

      // Don't scroll if at least 40% is already visible
      if (visibleRatio >= 0.4) {
        return;
      }

      const y = element.offsetTop || 0;
      window.scrollTo({
        behavior: "smooth",
        top: y - 100,
      });
    }
  }, [hash]); // Runs whenever the URL hash changes

  // Triggers function when nav section is intersected
  useEffect(() => {
    const elements = navList.map((item) =>
      document.getElementById(item.to.replace("#", "")),
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const to = `#${entry.target.id}`;
          navigate(to, { replace: true });
        }
      },
      {
        threshold: 0.4, // 40% of the element is visible
      },
    );

    for (const element of elements) {
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [navigate]);

  return (
    <header className="landing-page-header">
      <PageLogo />
      <nav className="page-nav">
        <ul>
          {navList.map((item) => (
            <li key={item.text} className={hash === item.to ? "selected" : ""}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="page-header-controls">
        <LinkButton to="/signin" scale={0}>
          Sign in
        </LinkButton>
        <LinkButton to="/signup" variants="secondary" scale={0}>
          Sign up
        </LinkButton>
      </div>
    </header>
  );
}

export default Header;
