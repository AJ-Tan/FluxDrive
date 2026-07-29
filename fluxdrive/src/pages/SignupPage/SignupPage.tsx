import { useCallback, useState } from "react";
import { auth_signUp } from "../../services/auth-service";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import TextField from "../../components/Inputs/Textfield/TextField";
import type { FormDataType } from "../../types/form-types";
import Button from "../../components/Buttons/Button";

const initialFormState = {
  values: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  errors: null,
};

function SignupPage() {
  const [
    {
      values: { firstName, lastName, email, password, confirmPassword },
      errors,
    },
    setFormData,
  ] = useState<FormDataType>(initialFormState);

  const setValue = useCallback((id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      values: { ...prev.values, [id]: value },
      errors: { ...prev.errors, [id]: [] },
    }));
  }, []);

  const resetInputs = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await auth_signUp(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    );
    if (!result.ok) {
      console.log(result);
      setFormData((prev) => ({
        ...prev,
        errors: result.errorDetails.validationError,
      }));
      return;
    }
    alert(result.message);
    resetInputs();
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="form-details">
          <h1>Create a FluxDrive Account</h1>
          <p>Enter your name and credential.</p>
        </div>
        <div className="form-content">
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
            id="password"
            label="Password"
            value={password}
            setValue={setValue}
            errors={errors?.["password"]}
            type="password"
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            setValue={setValue}
            errors={errors?.["confirmPassword"]}
            type="password"
          />

          <div className="form-controls">
            <Button type="submit" scale={1}>
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
