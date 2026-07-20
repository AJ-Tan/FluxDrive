import LandingPageLayout from "../../layouts/LandingPageLayout/LandingPageLayout";
import AccountSection from "./components/AccountSection/AccountSection";
import CollaborationSection from "./components/CollaborationSection/CollaborationSection";
import CTASection from "./components/CTASection/CTASection";
import CustomerSection from "./components/CustomerSection/CustomerSection";
import FAQsSection from "./components/FAQsSection/FAQsSection";
import HeroSection from "./components/HeroSection/HeroSection";
import StoreSection from "./components/StoreSection/StoreSection";

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
