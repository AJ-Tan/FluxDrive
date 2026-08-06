import useApp from "../../context/AppContext/useApp";
import "./appPage.css";
import ItemDetails from "./sections/ItemDetails/ItemDetails";
import type { FolderType } from "../../types/folder-types";
import { useParams } from "react-router";
import useAuth from "../../context/AuthContext/useAuth";
import { fileSizeText } from "../../utils/common-functions";

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
        <nav className="app-folder-nav">
          <ul>
            {folderNav?.map((folder) => (
              <li key={folder.id}>{folder.name}</li>
            ))}
          </ul>
        </nav>
        <div className="app-content">
          <table className="tbl-folder-contents">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Modified</th>
                <th>File Size</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {folder?.children.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>--</td>
                  <td>X</td>
                </tr>
              ))}
              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}
              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}

              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}

              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}

              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}

              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}

              {folder?.files.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.createdAt}</td>
                  <td>{fileSizeText(item.size)}</td>
                  <td>X</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ItemDetails />
    </>
  );
}

export default AppPage;
