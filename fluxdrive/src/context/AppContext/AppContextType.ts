import type { FileType } from "../../types/file-types";
import type { FolderType } from "../../types/folder-types";

export type AppStateType = {
  allFolders: FolderType[];
  allFiles: FileType[];
  focusedItem: {
    id: string;
    itemType: "folder" | "file";
  } | null;
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
      type: "activeFolder";
      payload: string;
    }
  | {
      type: "focusedItem";
      payload: {
        id: string;
        itemType: "folder" | "file";
      };
    }
  | {
      type: "updateFolders";
      payload: FolderType[];
    }
  | {
      type: "updateFiles";
      payload: FileType[];
    }
  | {
      type: "clearFocusedItem";
    };

export type AppReducerType = (
  state: AppStateType,
  action: AppActionType,
) => AppStateType;
