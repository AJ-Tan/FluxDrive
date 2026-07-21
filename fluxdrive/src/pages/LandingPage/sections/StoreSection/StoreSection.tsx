import store1Image from "../../../../assets/landing-page/store-section/store-1.png";
import store2Image from "../../../../assets/landing-page/store-section/store-2.png";
import store3Image from "../../../../assets/landing-page/store-section/store-3.png";
import Accordion1 from "../../../../components/Accordions/Accordion-1/Accordion1";

function StoreSection() {
  return (
    <section id="store" className="section-page">
      <section className="section-details scale-0">
        <h2>Cloud storage made easy</h2>
        <p>
          Simple and scalable cloud storage for people and teams of all sizes.
          Upload, open, share and edit files from any device.
        </p>
      </section>

      <Accordion1 accordionData={accordionData} keyText="store-item" />
    </section>
  );
}

const accordionData = [
  {
    title: "Storage that grows with you",
    description: (
      <p>
        Scale your storage effortlessly from 15GB to 5TB per user, plus the
        ability to request additional storage. Storage costs vary.
      </p>
    ),
    img: store1Image,
  },
  {
    title: "Gmail attachments straight to Drive",
    description: (
      <p>
        Save and organize Gmail attachments directly to Drive without leaving
        your inbox.
      </p>
    ),
    img: store2Image,
  },
  {
    title: "Scan documents with Drive",
    description: (
      <p>
        Quickly scan and store receipts, billing statements and more as
        searchable PDFs, directly from the Drive app for Android or iOS.
      </p>
    ),
    img: store3Image,
  },
];

export default StoreSection;
