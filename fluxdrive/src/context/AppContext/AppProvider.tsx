import { useEffect, useReducer, type JSX } from "react";
import { AppContext } from "./AppContext";
import { folderAll } from "../../services/folder-service";
import useAuth from "../AuthContext/useAuth";
import type { AppReducerType } from "./AppContextType";

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
    case "updateFolders":
      return {
        ...state,
        allFolders: action.payload,
      };
    case "updateFiles":
      return {
        ...state,
        allFiles: action.payload,
      };
    case "clearFocusedItem":
      return { ...state, focusedItem: null };
    default:
      return { ...state };
  }
};

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, dispatch] = useReducer(appReducer, appInitialState);
  const { user } = useAuth();

  useEffect(() => {
    folderAll().then((res) => {
      if (!res.ok) return console.log(res);
      dispatch({
        type: "updateData",
        payload: { folderId: `${user?.id}-1`, ...res.data },
      });
    });
  }, [user, dispatch]);

  return (
    <AppContext
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </AppContext>
  );
}

export default AppProvider;
