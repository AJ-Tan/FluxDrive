import type { ResponseType } from "./api-types";

export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type AuthSignUpType = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => Promise<ResponseType & { data: { createdUser: UserType } }>;

export type AuthSignInType = (
  email: string,
  password: string,
) => Promise<ResponseType & { data: { user: UserType; accessToken: string } }>;

export type AuthUser = () => Promise<
  ResponseType & { data: { user: UserType } }
>;
