import { Link } from "react-router";
import "./button.css";

type LinkButtonProps = {
  to: string;
  children: string;
  variants?: "primary" | "secondary";
  scale?: number;
};

function LinkButton(props: LinkButtonProps) {
  return (
    <Link
      to={props.to}
      className={`btn btn--${props.variants ? props.variants : "primary"} scale-${props.scale ? props.scale : 0}`}
    >
      {props.children}
    </Link>
  );
}

export default LinkButton;
