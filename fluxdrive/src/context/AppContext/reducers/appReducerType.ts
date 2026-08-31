import type { FileType } from "../../../types/file-types";
import type {
  FolderPathType,
  FolderStructureType,
  FolderType,
} from "../../../types/folder-types";

export type AppStateType = {
  allFolders: FolderType[];
  allFiles: FileType[];
  folderPath: FolderPathType[];
  folderStructure: FolderStructureType;
  focusedItem: {
    id: string;
    itemType: "folder" | "file";
  } | null;
  searchText: string;
};

export type AppActionType =
  | {
      type: "updateContent";
      payload: {
        allFolders: FolderType[];
        allFiles: FileType[];
        folderPath?: FolderPathType[];
        folderStructure?: FolderStructureType;
      };
    }
  | {
      type: "focusedItem";
      payload: {
        id: string;
        itemType: "folder" | "file";
      };
    }
  | {
      type: "clearFocusedItem";
    }
  | {
      type: "setSearch";
      payload: string;
    }
  | {
      type: "updateFolderStructure";
      payload: FolderStructureType;
    };

export type AppReducerType = (
  state: AppStateType,
  action: AppActionType,
) => AppStateType;
