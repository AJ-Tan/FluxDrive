import { Link } from "react-router";
import { useState } from "react";
import RotatingArrow2 from "../../../../../../../../components/AnimatedIcon/RotatingArrow2/RotatingArrow2";
import "./accordionSitemaps.css";

type AccordionSiteMapsProps = {
  siteMaps: {
    col: number;
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  }[];
};

function AccordionSiteMaps({ siteMaps }: AccordionSiteMapsProps) {
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return [...prev, index];
    });
  };

  return (
    <div className="sitemaps-accordion">
      {siteMaps.map((item, itemIndex) => {
        return (
          <details key={`${item.title}-${itemIndex}`}>
            <summary onClick={() => toggleAccordion(itemIndex)}>
              {item.title}{" "}
              <RotatingArrow2 rotate={activeAccordion.includes(itemIndex)} />
            </summary>
            <ul className="item-links">
              {item.links.map((linkItem, linkIndex) => (
                <li key={`${linkItem.text}-${linkIndex}`}>
                  <Link
                    to={linkItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

export default AccordionSiteMaps;
