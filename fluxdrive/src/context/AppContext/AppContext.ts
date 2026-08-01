import { createContext } from "react";
import type { FileType } from "../../types/file-types";

type AsideFolderType = {
  id: string;
  name: string;
  parentId: null | string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  children: AsideFolderType[];
};

export type AsideFoldersType = AsideFolderType;
export type FocusedItemType =
  | null
  | ((AsideFolderType | FileType) & { itemType: string });
export type SelectedFolderType = null | AsideFolderType;

type AppContextType = {
  asideFolders: [
    AsideFoldersType,
    React.Dispatch<React.SetStateAction<AsideFoldersType>>,
  ];
  focusedItem: [
    FocusedItemType,
    React.Dispatch<React.SetStateAction<FocusedItemType>>,
  ];
  selectedFolder: [
    SelectedFolderType,
    React.Dispatch<React.SetStateAction<SelectedFolderType>>,
  ];
} | null;

export const AppContext = createContext<AppContextType>(null);
