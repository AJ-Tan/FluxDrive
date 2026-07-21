import LandingPageLayout from "../../layouts/LandingPageLayout/LandingPageLayout";
import AccountSection from "./sections/AccountSection/AccountSection";
import CollaborationSection from "./sections/CollaborationSection/CollaborationSection";
import CTASection from "./sections/CTASection/CTASection";
import CustomerSection from "./sections/CustomerSection/CustomerSection";
import FAQsSection from "./sections/FAQsSection/FAQsSection";
import HeroSection from "./sections/HeroSection/HeroSection";
import StoreSection from "./sections/StoreSection/StoreSection";

import "./landingPage.css";

function LandingPage() {
  return (
    <LandingPageLayout>
      <HeroSection />
      <StoreSection />
      <CollaborationSection />
      <CustomerSection />
      <FAQsSection />
      <AccountSection />
      <CTASection />
    </LandingPageLayout>
  );
}

export default LandingPage;
