import { backendApi } from "../configs/backend-api";
import type { ResponseType } from "../types/api-types";
import type {
  FetchAuthSignInType,
  FetchAuthSignUpType,
  FetchAuthUserType,
} from "../types/auth.types";

const fetch_authSignUp: FetchAuthSignUpType = async (
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

const fetch_authSignIn: FetchAuthSignInType = async (email, password) => {
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

const fetch_authSignOut = async (): Promise<ResponseType> => {
  const data = await backendApi("/auth/signout", "POST");
  if (data.ok) localStorage.removeItem("accessToken");
  return data;
};

const fetch_authUser: FetchAuthUserType = async () => {
  const data = await backendApi("/protected", "GET");
  return data;
};

export {
  fetch_authSignUp,
  fetch_authSignIn,
  fetch_authSignOut,
  fetch_authUser,
};
