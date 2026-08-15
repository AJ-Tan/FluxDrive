import { createContext } from "react";
import type { AllContentItemType } from "../AppContext/AppProvider";
import type { FolderPathType } from "../../types/folder-types";

type ShareContextType = {
  activeFolderContent: AllContentItemType[];
  activeFolderNav: FolderPathType[];
};
export const ShareContext = createContext<ShareContextType | null>(null);
