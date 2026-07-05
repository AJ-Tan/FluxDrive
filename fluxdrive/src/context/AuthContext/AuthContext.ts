import { createContext } from "react";
import type { UserType } from "../../types/auth.types";

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);
