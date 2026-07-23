import "./rotatingArrow2.css";

function RotatingArrow2({ rotate = false }) {
  return <i className={`rotating-arrow2 ${rotate ? "rotate" : ""}`}></i>;
}

export default RotatingArrow2;
