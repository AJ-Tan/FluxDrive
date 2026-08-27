import type { ResponseType } from "./api-types";

export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type FetchAuthSignUpType = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => Promise<ResponseType & { data: { createdUser: UserType } }>;

export type FetchAuthSignInType = (
  email: string,
  password: string,
) => Promise<ResponseType & { data: { user: UserType; accessToken: string } }>;

export type FetchAuthUserType = () => Promise<
  ResponseType & { data: { user: UserType } }
>;
