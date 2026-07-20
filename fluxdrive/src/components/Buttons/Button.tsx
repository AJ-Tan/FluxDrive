import "./button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variants?: "primary" | "secondary";
  scale?: number;
};

function Button(props: ButtonProps) {
  return (
    <button
      className={`btn btn--${props.variants ? props.variants : "primary"} scale-${props.scale ? props.scale : 0}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
