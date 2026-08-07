import useApp from "../../context/AppContext/useApp";
import "./appPage.css";
import ItemDetails from "./sections/ItemDetails/ItemDetails";
import type { FolderType } from "../../types/folder-types";
import { useParams } from "react-router";
import useAuth from "../../context/AuthContext/useAuth";
import AppPageHeader from "./components/AppPageHeader/AppPageHeader";
import FolderTable from "./components/FolderTable/FolderTable";

type GetFolderNavType = (folder: FolderType) => FolderType[];

function AppPage() {
  const { appState } = useApp();
  const { folderid } = useParams();
  const { user } = useAuth();

  const getFolderNav: GetFolderNavType = (folder) => {
    const parentFolder = appState.allFolders.find(
      (item) => item.id === folder.parentId,
    );
    if (!parentFolder) return [folder];
    return [...getFolderNav(parentFolder), folder];
  };

  const activeFolderId = folderid ? folderid : `${user?.id}-1`;
  const activeFolder = appState.allFolders.find(
    (item) => item.id === activeFolderId,
  );
  const folderNav = activeFolder && getFolderNav(activeFolder);
  const folder = folderNav && folderNav.at(-1);

  return (
    <>
      <main className="app-page">
        <div className="app-page-container">
          <AppPageHeader folderNav={folderNav} />
          <div className="app-content">
            <FolderTable folder={folder} />
          </div>
        </div>
      </main>
      <ItemDetails />
    </>
  );
}

export default AppPage;
