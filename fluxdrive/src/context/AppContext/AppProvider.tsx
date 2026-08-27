import { useEffect, useReducer, useState, type JSX } from "react";
import {
  AppContext,
  type UploadFileType,
  type UploadFolderType,
} from "./AppContext";
import {
  fetch_folderAll,
  fetch_folderUpload,
} from "../../services/folder-service";
import useAuth from "../AuthContext/useAuth";
import { appInitialState, appReducer } from "./reducers/appReducer";
import { useParams } from "react-router";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import type { FileType } from "../../types/file-types";
import type { FolderType } from "../../types/folder-types";
import useUpload from "../UploadContext/useUpload";
import { fetch_fileAdd } from "../../services/file-service";

export type AllContentItemType =
  | (FileType & { type: "file" })
  | (FolderType & { type: "folder" });

export type ErrorType = {
  status: number;
  message: string;
} | null;

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, dispatchAppState] = useReducer(appReducer, appInitialState);
  const [appLoading, setAppLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  const { user } = useAuth();
  const { folderid } = useParams();
  const { dispatchUploadState } = useUpload();

  useEffect(() => {
    const activeFolderId = folderid ? folderid : `${user?.id}-1`;
    const findFolder = appState.allFolders.find(
      (i) => i.id === activeFolderId || i.id === "0",
    );

    if (!findFolder) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError({
        status: 404,
        message: "The requested URL was not found on this server.",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderid, setError]);

  useEffect(() => {
    fetch_folderAll().then((res) => {
      if (!res.ok) {
        setError({ status: res.status, message: res.message });
        return console.log(res);
      }
      dispatchAppState({
        type: "updateData",
        payload: { folderId: `${user?.id}-1`, ...res.data },
      });
      setAppLoading(false);
    });
  }, [user, setAppLoading]);

  const allContentItem = (): AllContentItemType[] => {
    const output: AllContentItemType[] = appState.allFolders.map((i) => ({
      ...i,
      type: "folder" as const,
    }));
    output.push(
      ...appState.allFiles.map((i) => ({ ...i, type: "file" as const })),
    );
    return output;
  };

  const uploadFolder: UploadFolderType = async (folderItems) => {
    const uploadFolderId = crypto.randomUUID();
    dispatchUploadState({
      type: "add",
      payload: {
        id: uploadFolderId,
        name: folderItems[0].name,
        type: "folder",
      },
    });

    const res = await fetch_folderUpload(folderItems);
    if (!res.ok) {
      return console.log(res);
    }

    dispatchAppState({
      type: "updateData",
      payload: {
        allFolders: res.data.allFolders,
        allFiles: res.data.allFiles,
      },
    });
    dispatchUploadState({
      type: "setComplete",
      payload: {
        id: uploadFolderId,
        url: folderItems[0].id || "",
      },
    });
  };

  const uploadFile: UploadFileType = async (file, folderId) => {
    const uploadId = crypto.randomUUID();
    dispatchUploadState({
      type: "add",
      payload: { id: uploadId, name: file.name, type: "file" },
    });

    const res = await fetch_fileAdd([file], folderId);
    if (!res.ok && res.name === "ValidationError") {
      alert(`File to be uploaded must not exceed 10MB.`);
      dispatchUploadState({ type: "remove", payload: uploadId });
      return;
    }

    if (!res.ok) {
      alert(res.message);
      dispatchUploadState({ type: "remove", payload: uploadId });
      return console.log(res);
    }

    dispatchAppState({
      type: "updateData",
      payload: {
        allFolders: res.data.allFolders,
        allFiles: res.data.allFiles,
      },
    });
    dispatchUploadState({
      type: "setComplete",
      payload: { id: uploadId, url: res.data.files[0].fileUrl },
    });
  };

  return (
    <AppContext
      value={{
        appState,
        appLoading,
        dispatchAppState,
        allContentItem,
        uploadFile,
        uploadFolder,
        setError,
      }}
    >
      {error ? (
        <ErrorPage defaultUrl="/app" {...error} setError={setError} />
      ) : (
        children
      )}
    </AppContext>
  );
}

export default AppProvider;
