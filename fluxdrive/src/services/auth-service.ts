import { backendApi } from "../configs/backend-api";
import type { ResponseType } from "../types/api-types";
import type {
  AuthSignInType,
  AuthSignUpType,
  AuthUser,
} from "../types/auth.types";

const auth_signUp: AuthSignUpType = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
) => {
  try {
    const data = await backendApi(
      "/auth/signup",
      "POST",
      JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const auth_signIn: AuthSignInType = async (email, password) => {
  try {
    const data = await backendApi(
      "/auth/signin",
      "POST",
      JSON.stringify({ email, password }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const auth_signOut = async (): Promise<ResponseType> => {
  const data = await backendApi("/auth/signout", "POST");
  if (data.ok) localStorage.removeItem("accessToken");
  return data;
};

const auth_user: AuthUser = async () => {
  const data = await backendApi("/protected", "GET");
  return data;
};

export { auth_signUp, auth_signIn, auth_signOut, auth_user };
