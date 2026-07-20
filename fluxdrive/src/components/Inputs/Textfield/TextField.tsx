import "./textfield.css";

type TextFieldProps = {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errors: string[] | undefined;
  clearErrors: (id: string) => void;
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
  clearErrors,
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
            clearErrors(id);
            setValue(e.target.value);
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

export default TextField;
