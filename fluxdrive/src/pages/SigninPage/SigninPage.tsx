import { useCallback, useState } from "react";
import { auth_signIn } from "../../services/auth-service";
import useAuth from "../../context/AuthContext/useAuth";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import TextField from "../../components/Inputs/Textfield/TextField";
import type { FormDataType } from "../../types/form-types";
import Button from "../../components/Buttons/Button";
import LinkButton from "../../components/Buttons/LinkButton";

const initialFormState = {
  values: {
    email: "",
    password: "",
  },
  errors: null,
};

function SigninPage() {
  const [
    {
      values: { email, password },
      errors,
    },
    setFormData,
  ] = useState<FormDataType>(initialFormState);
  const auth = useAuth();

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

    const result = await auth_signIn(email, password);
    if (!result.ok) {
      setFormData((prev) => ({
        ...prev,
        errors: result.errorDetails.validationError,
      }));
      return;
    }

    localStorage.setItem("accessToken", result.data.accessToken);
    auth.setUser(result.data.user);
    resetInputs();
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="form-details">
          <h1>Sign In</h1>
          <p>
            with your Google Account. This account will be available to other
            apps in the browser.
          </p>
        </div>
        <div className="form-content">
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

          <div className="form-controls">
            <LinkButton to="/signup" variants="transparent" scale={1}>
              Create an account
            </LinkButton>
            <Button type="submit" scale={1}>
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default SigninPage;
