import Accordion2 from "../../../../components/Accordions/Accordion-2/Accordion2";
import "./faqsSection.css";

function FAQsSection() {
  return (
    <section id="faqs" className="section-page">
      <section className="section-details scale-2">
        <h2>Curious about Google Drive?</h2>
        <p>Take a look at our FAQs to learn more.</p>
      </section>
      <Accordion2 accordionData={accordionData} keyText="faqs" />
    </section>
  );
}

const accordionData = [
  {
    title:
      "Can I migrate files from my current file storage solution to Drive?",
    description: (
      <p>
        Yes, you can use our migration tools and services to move your
        organization’s important data to Google Workspace from your current
        storage solutions.
      </p>
    ),
  },
  {
    title: "How much storage do I get with Drive?",
    description: (
      <p>
        Google Workspace’s Business and Enterprise editions provide customers
        with flexible options to meet their storage needs. To see which plan
        works best for your business, please visit our plans and pricing page.
      </p>
    ),
  },
  {
    title: "What's different about the business version of Drive?",
    description: (
      <p>
        The business version of Drive gives you more storage, stronger support,
        and shared drives for your team. Learn more about the various options
        available on the plans and pricing page.
      </p>
    ),
  },
];

export default FAQsSection;
