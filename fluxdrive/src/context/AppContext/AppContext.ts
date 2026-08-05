import { createContext } from "react";
import type { AppStateType } from "./AppContextType";
import type { AppActionType } from "./reducers/appReducer";
import type {
  UploadStatusActionType,
  UploadStatusListType,
} from "./reducers/uploadStatusReducer";

type AppContextType = {
  appState: AppStateType;
  dispatchAppState: React.ActionDispatch<[action: AppActionType]>;
  uploadState: UploadStatusListType;
  dispatchUploadState: React.ActionDispatch<[action: UploadStatusActionType]>;
} | null;

export const AppContext = createContext<AppContextType>(null);
