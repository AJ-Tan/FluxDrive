import collab1Image from "../../../../assets/landing-page/collab-section/collab-1.png";
import collab2Image from "../../../../assets/landing-page/collab-section/collab-2.png";
import collab3Image from "../../../../assets/landing-page/collab-section/collab-3.png";
import Accordion1 from "../../../../components/Accordions/Accordion-1/Accordion1";

function CollaborationSection() {
  return (
    <section id="collaboration" className="section-page">
      <section className="section-details scale-1">
        <h2>Streamlined content collaboration and workflows</h2>
        <p>
          Unleash your team's full potential with seamless collaboration and
          effortless teamwork.
        </p>
      </section>

      <Accordion1
        accordionData={accordionData}
        keyText="collab-item"
        reverse={true}
      />
    </section>
  );
}

const accordionData = [
  {
    title: "Manage access",
    description: (
      <p>
        Easily share files with customizable permissions (edit, comment, view).
        Control access further by preventing unwanted actions and setting
        expiration dates.
      </p>
    ),
    img: collab1Image,
  },
  {
    title: "Empower team collaboration with shared drives",
    description: (
      <p>
        Shared drives give teams a place to store, access, and manage files
        together.
      </p>
    ),
    img: collab2Image,
  },
  {
    title: "3rd party integrations",
    description: (
      <p>
        Import and create Google Drive files within third party apps like Slack,
        Zoom, Salesforce, Atlassian, SAP and many more to streamline your work.
      </p>
    ),
    img: collab3Image,
  },
];

export default CollaborationSection;
