import "./dialogDropdown.css";

type DialogDropdownProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function DialogDropdown(props: DialogDropdownProps) {
  return (
    <button className="btn-dialog-dropdown" {...props}>
      <div className="line-1"></div>
      <div className="line-2"></div>
      <div className="line-3"></div>
    </button>
  );
}

export default DialogDropdown;
