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
    folderShare: [],
  },
];

const appInitialState = {
  allFolders: allFoldersInitialState,
  allFiles: [],
  focusedItem: null,
  searchText: "",
};

const appReducer: AppReducerType = (state, action) => {
  switch (action.type) {
    case "updateData":
      return {
        ...state,
        allFolders: action.payload.allFolders,
        allFiles: action.payload.allFiles,
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
    case "setSearch":
      return { ...state, searchText: action.payload };
    default:
      return { ...state };
  }
};

export { appInitialState, appReducer };
