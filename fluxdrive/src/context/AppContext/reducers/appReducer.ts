import type { AppReducerType } from "./appReducerType";

const appInitialState = {
  allFolders: [],
  allFiles: [],
  folderPath: [],
  folderStructure: { id: "", name: "My Drive", children: [] },
  focusedItem: null,
  searchText: "",
};

const appReducer: AppReducerType = (state, action) => {
  switch (action.type) {
    case "updateContent":
      return {
        ...state,
        allFolders: action.payload.allFolders,
        allFiles: action.payload.allFiles,
        ...(action.payload.folderPath && {
          folderPath: action.payload.folderPath,
        }),
        ...(action.payload.folderStructure && {
          folderStructure: action.payload.folderStructure,
        }),
      };
    case "updateFolderStructure":
      return {
        ...state,
        folderStructure: action.payload,
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
