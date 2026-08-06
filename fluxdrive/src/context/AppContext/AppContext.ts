import { createContext } from "react";
import type { AppActionType, AppStateType } from "./reducers/appReducerType";

type AppContextType = {
  appState: AppStateType;
  dispatchAppState: React.ActionDispatch<[action: AppActionType]>;
} | null;

export const AppContext = createContext<AppContextType>(null);
