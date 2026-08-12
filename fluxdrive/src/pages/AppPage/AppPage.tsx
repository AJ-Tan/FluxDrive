import useApp from "../../context/AppContext/useApp";
import "./appPage.css";
import ItemDetails from "./sections/ItemDetails/ItemDetails";
import type { FolderType } from "../../types/folder-types";
import { useParams } from "react-router";
import useAuth from "../../context/AuthContext/useAuth";
import AppPageHeader from "./components/AppPageHeader/AppPageHeader";
import FolderTable from "./components/FolderTable/FolderTable";
import type { FileType } from "../../types/file-types";
import type { AllContentItemType } from "../../context/AppContext/AppProvider";
import { useEffect } from "react";

type GetFolderNavType = (folder: FolderType) => FolderType[];
type FolderContentType =
  | (FileType & { type: "file" })
  | (FolderType & { type: "folder" });

function AppPage() {
  const { appState, dispatchAppState, allContentItem } = useApp();
  const { folderid } = useParams();
  const { user } = useAuth();

  const activeFolderId = folderid ? folderid : `${user?.id}-1`;
  const activeFolder = appState.allFolders.find(
    (item) => item.id === activeFolderId,
  );

  useEffect(() => {
    dispatchAppState({ type: "setSearch", payload: "" });
  }, [folderid, dispatchAppState]);

  const getFolderNav: GetFolderNavType = (folder) => {
    const parentFolder = appState.allFolders.find(
      (item) => item.id === folder.parentId,
    );
    if (!parentFolder) return [folder];
    return [...getFolderNav(parentFolder), folder];
  };

  const getFolderContent = (
    folder: FolderType | undefined,
  ): AllContentItemType[] => {
    const folderChildren = folder?.children;
    const folderFiles = folder?.files;

    const folderContent: FolderContentType[] = folderChildren
      ? [...folderChildren.map((i) => ({ ...i, type: "folder" as const }))]
      : [];
    if (folderFiles && folderFiles.length > 0) {
      folderContent.push(
        ...folderFiles.map((i) => ({ ...i, type: "file" as const })),
      );
    }

    return folderContent;
  };

  const getSearchContent = () => {
    const searchText = appState.searchText;
    if (!searchText) return null;

    return allContentItem().filter((i) =>
      i.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const folderNav = activeFolder && getFolderNav(activeFolder);
  const folder = folderNav && folderNav.at(-1);

  return (
    <>
      <main className="app-page">
        <div className="app-page-container">
          <AppPageHeader folderNav={folderNav} />
          <div className="app-content">
            <FolderTable
              tableData={getSearchContent() || getFolderContent(folder)}
            />
          </div>
        </div>
      </main>
      <ItemDetails />
    </>
  );
}

export default AppPage;
