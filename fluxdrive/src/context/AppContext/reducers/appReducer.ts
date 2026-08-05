import type { FileType } from "../../../types/file-types";
import type { FolderType } from "../../../types/folder-types";
import type { AppStateType } from "../AppContextType";

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
      type: "clearFocusedItem";
    };

type AppReducerType = (
  state: AppStateType,
  action: AppActionType,
) => AppStateType;

const allFoldersInitialState = [
  {
    id: "0",
    name: "My Drive",
    parentId: "",
    ownerId: "0",
    createdAt: "0",
    updatedAt: "0",
    parent: null,
    children: [],
    files: [],
    folderPath: [],
  },
];

const appInitialState = {
  allFolders: allFoldersInitialState,
  allFiles: [],
  activeFolder: null,
  focusedItem: null,
};

const appReducer: AppReducerType = (state, action) => {
  switch (action.type) {
    case "updateData":
      return {
        ...state,
        allFolders: action.payload.allFolders,
        allFiles: action.payload.allFiles,
      };
    case "activeFolder":
      return {
        ...state,
        activeFolder: action.payload,
        focusedItem: {
          id: action.payload,
          itemType: "folder",
        },
      };
    case "focusedItem":
      return {
        ...state,
        focusedItem: {
          id: action.payload.id,
          itemType: action.payload.itemType,
        },
      };
    case "clearFocusedItem":
      return { ...state, focusedItem: null };
    default:
      return { ...state };
  }
};

export { appInitialState, appReducer };
