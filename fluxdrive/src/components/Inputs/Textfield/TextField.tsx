import { memo } from "react";
import "./textfield.css";

type TextFieldProps = {
  id: string;
  value: string;
  setValue: (id: string, value: string) => void;
  errors: string[] | undefined;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

function TextField({
  id,
  value,
  setValue,
  errors,
  label = "",
  placeholder = "",
  type = "text",
  required = true,
}: TextFieldProps) {
  return (
    <div className="textfield">
      <label>
        <div className="label-wrapper" hidden={label === ""}>
          <span className="label">{`${label}${required ? "*" : ""}`}</span>
        </div>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => {
            setValue(id, e.target.value);
          }}
          placeholder={placeholder}
          autoComplete="chrome-off"
        />
      </label>
      {errors && errors?.length > 0 ? (
        <ul className="textfield-errors">
          {errors.map((item, index) => (
            <li key={`${id}-error-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(TextField);
