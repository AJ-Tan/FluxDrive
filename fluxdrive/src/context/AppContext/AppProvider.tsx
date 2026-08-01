import { useEffect, useState, type JSX } from "react";
import {
  AppContext,
  type AsideFoldersType,
  type FocusedItemType,
  type SelectedFolderType,
} from "./AppContext";
import { folderAll } from "../../services/folder-service";

const asideFoldersInitialState = {
  id: "0",
  name: "My Drive",
  parentId: null,
  ownerId: "0",
  createdAt: "0",
  updatedAt: "0",
  children: [],
};

function AppProvider({ children }: { children: JSX.Element }) {
  const [asideFolders, setAsideFolders] = useState<AsideFoldersType>(
    asideFoldersInitialState,
  );
  const focusedItem = useState<FocusedItemType>(null);
  const selectedFolder = useState<SelectedFolderType>(null);

  useEffect(() => {
    folderAll().then((res) => {
      if (!res.ok) return console.log(res);
      setAsideFolders(res.data.folder);
    });
  }, [setAsideFolders]);

  return (
    <AppContext
      value={{
        asideFolders: [asideFolders, setAsideFolders],
        focusedItem,
        selectedFolder,
      }}
    >
      {children}
    </AppContext>
  );
}

export default AppProvider;
