import { createContext } from "react";
import type { AppActionType, AppStateType } from "./reducers/appReducerType";
import type { AllContentItemType, ErrorType } from "./AppProvider";
import type { FolderItemsType } from "../../types/folder-types";

export type UploadFolderType = (folderItems: FolderItemsType[]) => void;
export type UploadFileType = (file: File, folderId: string) => void;

type AppContextType = {
  appState: AppStateType;
  appLoading: boolean;
  dispatchAppState: React.ActionDispatch<[action: AppActionType]>;
  updateAppUI: () => Promise<void>;
  allContentItem: () => AllContentItemType[];
  uploadFolder: UploadFolderType;
  uploadFile: UploadFileType;
  setError: React.Dispatch<React.SetStateAction<ErrorType>>;
} | null;

export const AppContext = createContext<AppContextType>(null);
