import type { FileType } from "../../../types/file-types";
import type { FolderType } from "../../../types/folder-types";

export type AppStateType = {
  allFolders: FolderType[];
  allFiles: FileType[];
  focusedItem: {
    id: string;
    itemType: "folder" | "file";
  } | null;
  searchText: string;
};

export type AppActionType =
  | {
      type: "updateData";
      payload: {
        folderId?: string;
        allFolders: FolderType[];
        allFiles: FileType[];
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
    };

export type AppReducerType = (
  state: AppStateType,
  action: AppActionType,
) => AppStateType;
