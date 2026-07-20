import LinkButton from "../../../../components/Buttons/LinkButton";
import PageLogo from "../../../../components/PageLogo/PageLogo";
import "./accountSection.css";

function AccountSection() {
  return (
    <section id="account" className="section-page">
      <div className="content">
        <PageLogo />
        <h2>Store, manage and collaborate with FluxDrive</h2>
        <div className="controls">
          <LinkButton to="/signin" scale={1}>
            Sign in
          </LinkButton>
          <LinkButton to="/signup" scale={1} variants="secondary">
            Sign up
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default AccountSection;
