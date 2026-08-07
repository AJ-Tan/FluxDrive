import customer1Image from "../../../../assets/landing-page/customer-section/customer-1.png";
import customer2Image from "../../../../assets/landing-page/customer-section/customer-2.png";
import customer3Image from "../../../../assets/landing-page/customer-section/customer-3.png";
import Testimonial from "./components/Testimonial/Testimonial";
import "./customerSection.css";

function CustomerSection() {
  return (
    <section id="customer" className="section--full-width">
      <div className="content-container">
        <section className="section-details scale-2">
          <h2>Learn why organizations use Drive</h2>
        </section>
        <Testimonial testimonialData={testimonialData} />
      </div>
    </section>
  );
}

const testimonialData = [
  {
    img: customer1Image,
    message:
      "Starting a new project is effortless now. Our team instantly gets a complete workspace with the files and folders we need, allowing us to focus on the work instead of the setup.",
    user: "Olivia Bennett",
    userDetails: "Operations Manager, NorthBridge Creative",
  },
  {
    img: customer2Image,
    message:
      "With such a massive collection of documents, staying organized used to be a challenge. Automated categorization keeps everything easy to find while eliminating hours of manual sorting.",
    user: "Daniel Kim",
    userDetails: "Head of Information Security, Apex Technologies",
  },
  {
    img: customer3Image,
    message:
      "Every completed project becomes a valuable resource for the next one. Our teams can quickly discover previous solutions, build on proven ideas, and avoid duplicating work.",
    user: "Sophia Martinez",
    userDetails: "Senior Product Manager, Elevate Solutions",
  },
];

export default CustomerSection;
