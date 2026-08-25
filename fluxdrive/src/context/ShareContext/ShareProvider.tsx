import type { JSX } from "react/jsx-runtime";
import { ShareContext } from "./ShareContext";
import { useEffect, useState } from "react";
import { fetchSharedFolder } from "../../services/share-service";
import { useParams } from "react-router";
import type { ShareDataType } from "../../types/share-types";
import type { AllContentItemType } from "../AppContext/AppProvider";
import type { FolderPathType } from "../../types/folder-types";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

function ShareProvider({ children }: { children: JSX.Element }) {
  const [sharedFolder, setSharedFolder] = useState<ShareDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    status: number;
    name: string;
    message: string;
  } | null>(null);
  const { shareid, folderid } = useParams();
  useEffect(() => {
    if (!shareid) return;
    fetchSharedFolder(shareid).then((res) => {
      setLoading(false);
      if (!res.ok)
        return setError({ status: 404, name: res.name, message: res.message });
      setSharedFolder(res.data);
    });
  }, [setSharedFolder, shareid, setError]);

  const currFolderId = folderid ? folderid : sharedFolder?.folderShare.folderId;

  const allContent: AllContentItemType[] = sharedFolder
    ? [
        ...sharedFolder.allFolders.map((i) => ({
          ...i,
          type: "folder" as const,
        })),
        ...sharedFolder.allFiles.map((i) => ({ ...i, type: "file" as const })),
      ]
    : [];
  const activeFolderContent: AllContentItemType[] = allContent
    ? allContent.filter((i) =>
        i.type === "folder"
          ? i.parentId === currFolderId
          : i.folderId === currFolderId,
      )
    : [];

  const getActiveFolder = (folderId: string | undefined): FolderPathType[] => {
    if (!sharedFolder || !folderId) return [];

    const folder = sharedFolder?.allFolders.find((i) => i.id === folderId);
    if (!folder) return [];
    return [
      ...getActiveFolder(folder.parentId),
      { id: folder.id, name: folder.name },
    ];
  };
  const activeFolderNav: FolderPathType[] = activeFolderContent
    ? getActiveFolder(currFolderId)
    : [];
  return loading ? (
    <>Loading</>
  ) : error ? (
    <ErrorPage
      defaultUrl="/app"
      status={error.status}
      message={error.message}
    />
  ) : (
    <ShareContext value={{ activeFolderContent, activeFolderNav }}>
      {children}
    </ShareContext>
  );
}

export default ShareProvider;
