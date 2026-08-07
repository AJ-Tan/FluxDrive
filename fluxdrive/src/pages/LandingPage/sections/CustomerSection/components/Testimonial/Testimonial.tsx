import { useState } from "react";
import "./testimonial.css";
import LeftArrowIcon from "../../../../../../assets/icons/arrow-left.svg?react";
import RightArrowIcon from "../../../../../../assets/icons/arrow-right.svg?react";

type TestimonialProps = {
  testimonialData: Record<string, string>[];
};
function Testimonial({ testimonialData }: TestimonialProps) {
  const [activePagination, setActivePagination] = useState(0);

  return (
    <div className="testimonial">
      <div className="testimonial-content">
        <button
          type="button"
          onClick={() => setActivePagination((prev) => prev - 1)}
          disabled={activePagination <= 0}
        >
          <LeftArrowIcon />
        </button>
        <ul className="testimonial-list" data-index={activePagination}>
          {testimonialData.map((item, index) => {
            return (
              <li
                key={`testimonial-item-${index}`}
                className="testimonial-item"
              >
                <img src={item.img} alt="" />
                <blockquote className="blockquote--add-quotes">
                  <p>{item.message}</p>
                </blockquote>
                <span className="author">
                  <span className="user">{item.user}</span>,{" "}
                  <span className="user-details">{item.userDetails}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => setActivePagination((prev) => prev + 1)}
          disabled={activePagination === testimonialData.length - 1}
        >
          <RightArrowIcon />
        </button>
      </div>

      <div role="tablist" className="pagination-dot">
        {Array.from({ length: testimonialData.length }, (_, i) => (
          <button
            key={`pagination-dot-${i}`}
            role="role"
            tabIndex={0}
            className="dot"
            aria-selected={activePagination === i}
            onClick={() => setActivePagination(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
