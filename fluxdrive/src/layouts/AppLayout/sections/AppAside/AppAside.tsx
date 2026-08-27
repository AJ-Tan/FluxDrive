import "./appAside.css";
import useApp from "../../../../context/AppContext/useApp";
import FolderItem from "./components/FolderItem/FolderItem";
import ButtonNew from "./components/ButtonNew/ButtonNew";
import useAuth from "../../../../context/AuthContext/useAuth";
import type { FolderType } from "../../../../types/folder-types";

function AppAside() {
  const { appState } = useApp();
  const { user } = useAuth();

  const structuredAllFolderData = () => {
    const allFolders = appState.allFolders;
    if (!user || !allFolders[0]?.id) return allFolders[0];

    const baseFolderId = `${user.id}-1`;
    const baseFolder = allFolders.filter(
      (folder) => folder.id === baseFolderId,
    )[0];

    if (!baseFolder) return allFolders[0];
    const arrangeFolderData = (folderParamObj: FolderType): FolderType => {
      const childrenFolders = allFolders.filter(
        (folder) => folder.parentId === folderParamObj.id,
      );

      const children: FolderType[] =
        childrenFolders.map((child) => {
          return arrangeFolderData(child);
        }) || [];

      return {
        ...folderParamObj,
        children,
      };
    };

    return arrangeFolderData(baseFolder);
  };
  console.log(structuredAllFolderData());
  return (
    <aside className="app-aside">
      <ButtonNew />
      <FolderItem key={`root`} folder={structuredAllFolderData()} index={1} />
    </aside>
  );
}

export default AppAside;
