import { useState } from "react";
import { ctaLandingPage } from "../../../../services/cta-service";
import TextField from "../../../../components/Inputs/Textfield/TextField";
import Button from "../../../../components/Buttons/Button";
import "./ctaSection.css";

function CTASection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<null | Record<string, string[]>>(null);

  const resetInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setErrors(null);
  };

  const clearErrors = (id: string) => {
    setErrors((prev) => {
      if (!prev) return prev;
      prev[id] = [];
      return prev;
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await ctaLandingPage(firstName, lastName, email, contact);

    if (!res.ok) {
      setErrors(res.errorDetails.validationError);
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
          setValue={setFirstName}
          errors={errors?.["firstName"]}
          clearErrors={clearErrors}
        />
        <TextField
          id="lastName"
          label="Last name"
          value={lastName}
          setValue={setLastName}
          errors={errors?.["lastName"]}
          clearErrors={clearErrors}
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          setValue={setEmail}
          errors={errors?.["email"]}
          type="email"
          clearErrors={clearErrors}
        />
        <TextField
          id="contact"
          value={contact}
          setValue={setContact}
          placeholder="0912 123 4567"
          errors={errors?.["firstName"]}
          clearErrors={clearErrors}
        />
        <Button type="submit" scale={1}>
          Continue
        </Button>
      </form>
    </section>
  );
}

export default CTASection;
