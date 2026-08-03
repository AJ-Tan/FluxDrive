import { createContext } from "react";
import type { AppActionType, AppStateType } from "./AppContextType";

type AppContextType = {
  appState: AppStateType;
  dispatch: React.ActionDispatch<[action: AppActionType]>;
} | null;

export const AppContext = createContext<AppContextType>(null);
