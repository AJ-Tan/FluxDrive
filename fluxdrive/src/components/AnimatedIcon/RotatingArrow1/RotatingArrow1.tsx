import "./rotatingArrow1.css";

function RotatingArrow1({ rotate = false }) {
  return <i className={`rotating-arrow1 ${rotate ? "rotate" : ""}`}></i>;
}

export default RotatingArrow1;
