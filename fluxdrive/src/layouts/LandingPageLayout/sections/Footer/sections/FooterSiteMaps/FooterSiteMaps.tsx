import "./footerSiteMaps.css";
import { useEffect, useState } from "react";
import AccordionSiteMaps from "./sublayouts/AccordionSitemaps/AccordionSitemaps";
import ColumnSiteMaps from "./sublayouts/ColumnSiteMaps/ColumnSiteMaps";

function FooterSiteMaps() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1025px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section className="footer-sitemaps">
      {isDesktop ? (
        <ColumnSiteMaps siteMaps={siteMaps} />
      ) : (
        <AccordionSiteMaps siteMaps={siteMaps} />
      )}
    </section>
  );
}

const siteMaps = [
  {
    col: 1,
    title: "Included applications",
    links: [
      { text: "Gmail", link: "https://workspace.google.com/products/gmail/" },
      { text: "Meet", link: "https://workspace.google.com/products/meet/" },
      { text: "Chat", link: "https://workspace.google.com/products/chat/" },
      {
        text: "Calendar",
        link: "https://workspace.google.com/products/calendar/",
      },
      { text: "Drive", link: "https://workspace.google.com/products/drive/" },
      { text: "Docs", link: "https://workspace.google.com/products/docs/" },
      { text: "Sheets", link: "https://workspace.google.com/products/sheets/" },
      { text: "Slides", link: "https://workspace.google.com/products/slides/" },
      { text: "Vids", link: "https://workspace.google.com/products/vids/" },
      { text: "Forms", link: "https://workspace.google.com/products/forms/" },
      { text: "Sites", link: "https://workspace.google.com/products/sites/" },
      { text: "Keep", link: "https://workspace.google.com/products/keep/" },
      {
        text: "Apps Script",
        link: "https://workspace.google.com/products/apps-script/",
      },
    ],
  },
  {
    col: 2,
    title: "Security and management",
    links: [
      { text: "Admin", link: "https://workspace.google.com/products/admin/" },
      {
        text: "Endpoint",
        link: "https://workspace.google.com/products/endpoint/",
      },
      { text: "Vault", link: "https://workspace.google.com/products/vault/" },
      {
        text: "Work Insights",
        link: "https://workspace.google.com/products/work-insights/",
      },
    ],
  },
  {
    col: 2,
    title: "Solutions",
    links: [
      {
        text: "New Business",
        link: "https://workspace.google.com/solutions/new-business/",
      },
      {
        text: "Small Business",
        link: "https://workspace.google.com/solutions/business/",
      },
      { text: "Enterprise", link: "https://workspace.google.com/enterprise/" },
      {
        text: "Retail",
        link: "https://workspace.google.com/solutions/retail/",
      },
      {
        text: "Manufacturing",
        link: "https://workspace.google.com/solutions/manufacturing/",
      },
      {
        text: "Professional Services",
        link: "https://workspace.google.com/solutions/professional-services/",
      },
      {
        text: "Technology",
        link: "https://workspace.google.com/solutions/technology/",
      },
      {
        text: "Healthcare",
        link: "https://workspace.google.com/solutions/healthcare/",
      },
      {
        text: "Government",
        link: "https://workspace.google.com/solutions/government/",
      },
      {
        text: "Education",
        link: "https://workspace.google.com/solutions/education/",
      },
      { text: "Nonprofits", link: "https://workspace.google.com/nonprofits/" },
      {
        text: "Artificial Intelligence",
        link: "https://workspace.google.com/ai/",
      },
    ],
  },
  {
    col: 3,
    title: "Pricing",
    links: [
      {
        text: "Compare pricing plans",
        link: "https://workspace.google.com/pricing.html",
      },
    ],
  },
  {
    col: 3,
    title: "Add-ons",
    links: [
      {
        text: "Meet hardware",
        link: "https://workspace.google.com/products/meet-hardware/",
      },
      {
        text: "Google Voice",
        link: "https://workspace.google.com/products/voice/",
      },
      {
        text: "AppSheet",
        link: "https://workspace.google.com/products/appsheet/",
      },
    ],
  },
  {
    col: 4,
    title: "Resources",
    links: [
      {
        text: "Working remotely",
        link: "https://workspace.google.com/resources/remote-work/",
      },
      { text: "Security", link: "https://workspace.google.com/security/" },
      {
        text: "Customer Stories",
        link: "https://workspace.google.com/resources/customer-stories/",
      },
      { text: "FAQs", link: "https://workspace.google.com/faq/" },
      { text: "Partners", link: "https://workspace.google.com/partners/" },
      {
        text: "Marketplace",
        link: "https://workspace.google.com/marketplace/",
      },
      {
        text: "Integrations",
        link: "https://workspace.google.com/marketplace/category/works-with-google-workspace",
      },
      {
        text: "Training & Certification",
        link: "https://workspace.google.com/learning-center/",
      },
      {
        text: "Refer Google Workspace",
        link: "https://workspace.google.com/referral/",
      },
    ],
  },
  {
    col: 5,
    title: "Learning and support",
    links: [
      { text: "Admin Help", link: "https://support.google.com/a/" },
      {
        text: "Setup and Deployment Center",
        link: "https://support.google.com/a/topic/1409901",
      },
      {
        text: "Learning Center for Users",
        link: "https://support.google.com/a/users/",
      },
      {
        text: "Forums for Admins",
        link: "https://www.googlecloudcommunity.com/gc/Google-Workspace/ct-p/google-workspace",
      },
      {
        text: "statusDashboard",
        link: "https://www.google.com/appsstatus/dashboard/",
      },
      { text: "whatsNew", link: "https://workspaceupdates.googleblog.com/" },
      {
        text: "Find a Google Workspace Partner",
        link: "https://cloud.google.com/find-a-partner/",
      },
      {
        text: "Join the community of IT Admins",
        link: "https://www.googlecloudcommunity.com/gc/Google-Workspace/ct-p/google-workspace",
      },
      { text: "Press", link: "https://workspace.google.com/resources/press/" },
    ],
  },
  {
    col: 5,
    title: "More from Google",
    links: [
      { text: "Google Cloud", link: "https://cloud.google.com/" },
      { text: "Google Domains", link: "https://domains.google/" },
      { text: "Chrome Enterprise", link: "https://chromeenterprise.google/" },
      {
        text: "Google Business Solutions",
        link: "https://business.google.com/",
      },
      { text: "Google Ads", link: "https://ads.google.com/" },
      {
        text: "Business Messages",
        link: "https://developers.google.com/business-communications/business-messages",
      },
    ],
  },
];

export default FooterSiteMaps;
