import Accordion2 from "../../../../components/Accordions/Accordion-2/Accordion2";
import "./faqsSection.css";

function FAQsSection() {
  return (
    <section id="faqs" className="section-page">
      <section className="section-details scale-2">
        <h2>Curious about FluxDrive?</h2>
        <p>Take a look at our FAQs to learn more.</p>
      </section>
      <Accordion2 accordionData={accordionData} keyText="faqs" />
    </section>
  );
}

const accordionData = [
  {
    title: "Can I move my existing files to FluxDrive?",
    description: (
      <p>
        Yes. FluxDrive makes it easy to transfer your files from your current
        storage provider. Simply upload your files or use our import tools to
        get started without disrupting your workflow.
      </p>
    ),
  },
  {
    title: "How much storage does FluxDrive provide?",
    description: (
      <p>
        FluxDrive offers flexible storage options designed for individuals,
        teams, and businesses. You can choose the plan that best fits your needs
        and upgrade anytime as your storage requirements grow.
      </p>
    ),
  },
  {
    title: "Why should I choose FluxDrive?",
    description: (
      <p>
        FluxDrive combines secure cloud storage, fast file access, and seamless
        collaboration in one platform. Organize your files, share them with
        confidence, and access your content from anywhere with ease.
      </p>
    ),
  },
];

export default FAQsSection;
