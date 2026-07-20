import { useRef, useState, type JSX } from "react";
import "./accordion1.css";

type AccordionProps = {
  accordionData: {
    title: string;
    description: JSX.Element;
    img: string;
  }[];
  keyText: string;
  reverse?: boolean;
};

function Accordion1({
  accordionData,
  keyText,
  reverse = false,
}: AccordionProps) {
  const [active, setActive] = useState(0);
  const listItemRefs = useRef<(HTMLElement | null)[]>([]);

  return (
    <section className={`accordion-1 ${reverse ? "reverse" : ""}`}>
      <div className="content-list">
        {accordionData.map((item, index) => (
          <details
            key={`${keyText}--${index}`}
            ref={(el) => {
              listItemRefs.current[index] = el;
            }}
            aria-selected={active === index}
            aria-controls="image-panel"
            open={active === index}
          >
            <summary
              className="heading"
              onClick={(e) => {
                e.preventDefault();
                setActive(index);
              }}
            >
              <h3 role="button">{item.title}</h3>
            </summary>
            <div
              className="content"
              onTransitionEnd={() => {
                const winX = window.innerWidth;
                const remInPixels = parseFloat(
                  getComputedStyle(document.documentElement).fontSize,
                );
                const rem = (px: number) => px * remInPixels;

                if (winX > 1024) return;
                const y = listItemRefs.current[index]?.offsetTop || 0;
                window.scrollTo({
                  behavior: "smooth",
                  top: y - (winX >= 450 && winX <= 800 ? rem(6.5) : rem(3.5)),
                });
              }}
            >
              <div className="body">{item.description}</div>
              <div className="image">
                <img src={item.img} alt="" />
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="image-panel-container">
        <img id="image-panel" src={accordionData[active].img} alt="" />
      </div>
    </section>
  );
}

export default Accordion1;
