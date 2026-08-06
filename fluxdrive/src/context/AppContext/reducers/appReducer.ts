import type { AppReducerType } from "./appReducerType";

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
