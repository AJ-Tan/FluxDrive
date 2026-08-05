import "./buttonClose.css";

function ButtonClose({ handleClose }: { handleClose: () => void }) {
  return (
    <button
      className="btn-close"
      aria-label="Close"
      onClick={handleClose}
    ></button>
  );
}

export default ButtonClose;
