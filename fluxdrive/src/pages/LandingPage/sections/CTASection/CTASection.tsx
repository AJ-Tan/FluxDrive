import { useState } from "react";
import { ctaLandingPage } from "../../../../services/cta-service";
import TextField from "../../../../components/Inputs/Textfield/TextField";
import Button from "../../../../components/Buttons/Button";
import type { FormDataType } from "../../../../types/form-types";
import "./ctaSection.css";

const initialFormState = {
  values: {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  },
  errors: null,
};

function CTASection() {
  const [
    {
      values: { firstName, lastName, email, contact },
      errors,
    },
    setFormData,
  ] = useState<FormDataType>(initialFormState);
  const resetInputs = () => {
    setFormData(initialFormState);
  };

  const setValue = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      values: { ...prev.values, [id]: value },
      errors: { ...prev.errors, [id]: [] },
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await ctaLandingPage(firstName, lastName, email, contact);

    if (!res.ok) {
      setFormData((prev) => ({
        ...prev,
        errors: res.errorDetails.validationError,
      }));
      return;
    }

    resetInputs();
    alert("This is just a design.");
  };

  return (
    <section id="cta" className="section-page">
      <div className="heading">
        <h2>Sign up for productivity, collaboration, and updates</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="firstName"
          label="First name"
          value={firstName}
          setValue={setValue}
          errors={errors?.["firstName"]}
        />
        <TextField
          id="lastName"
          label="Last name"
          value={lastName}
          setValue={setValue}
          errors={errors?.["lastName"]}
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          setValue={setValue}
          errors={errors?.["email"]}
          type="email"
        />
        <TextField
          id="contact"
          value={contact}
          setValue={setValue}
          placeholder="0912 123 4567"
          errors={errors?.["firstName"]}
        />
        <Button type="submit" scale={1}>
          Continue
        </Button>
      </form>
    </section>
  );
}

export default CTASection;
