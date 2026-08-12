import { createContext } from "react";
import type { AppActionType, AppStateType } from "./reducers/appReducerType";
import type { AllContentItemType } from "./AppProvider";

type AppContextType = {
  appState: AppStateType;
  dispatchAppState: React.ActionDispatch<[action: AppActionType]>;
  allContentItem: () => AllContentItemType[];
} | null;

export const AppContext = createContext<AppContextType>(null);
