import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import "./accordion2.css";

type AccordionProps = {
  accordionData: {
    title: string;
    description: JSX.Element;
  }[];
  keyText: string;
};

function Accordion2({ accordionData, keyText }: AccordionProps) {
  const [active, setActive] = useState([0]);

  const collapse = () => {
    setActive([]);
  };

  const extend = () => {
    setActive(Array.from({ length: accordionData.length }, (_, i) => i));
  };

  const toggle = (index: number) => {
    const isExist = active.includes(index);
    setActive((prev) => {
      if (isExist) return prev.filter((i) => i !== index);
      return [...prev, index];
    });
  };

  return (
    <div className="accordion-2">
      <button
        type="button"
        onClick={() =>
          active.length === accordionData.length ? collapse() : extend()
        }
        aria-controls={keyText}
        aria-expanded={active.length === accordionData.length}
      >
        {active.length === accordionData.length ? "Collapse all" : "Extend all"}
        <div className="icon"></div>
      </button>
      <div id={keyText} role="tablist" className="content-list">
        {accordionData.map((item, index) => (
          <details
            key={`${keyText}-${index}`}
            aria-selected={active.includes(index)}
            open={active.includes(index)}
          >
            <summary
              role="button"
              tabIndex={0}
              className="heading"
              onClick={(e) => {
                e.preventDefault();
                toggle(index);
              }}
            >
              <h3>{item.title}</h3>
              <div className="rotating-arrow"></div>
            </summary>
            <div className="description-container">
              <div className="description-container-wrapper">
                {item.description}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default Accordion2;
