import { useEffect, useReducer, useState, type JSX } from "react";
import {
  AppContext,
  type UploadFileType,
  type UploadFolderType,
} from "./AppContext";
import {
  fetch_folderAllData,
  fetch_folderOpen,
  fetch_folderStructure,
  fetch_folderUpload,
} from "../../services/folder-service";
import { appInitialState, appReducer } from "./reducers/appReducer";
import { useParams, useSearchParams } from "react-router";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import type { FileType } from "../../types/file-types";
import type { FolderType } from "../../types/folder-types";
import useUpload from "../UploadContext/useUpload";
import { fetch_fileAdd } from "../../services/file-service";
import { fetch_searchContent } from "../../services/search-service";

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
  const { folderid } = useParams();
  const [searchParams] = useSearchParams();
  const { dispatchUploadState } = useUpload();

  useEffect(() => {
    fetch_folderStructure()
      .then((res) => {
        if (!res.ok) return console.log(res);
        dispatchAppState({
          type: "updateFolderStructure",
          payload: res.data.folderStructure,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    const openFolder = async () => {
      setAppLoading(true);
      if (searchQuery) {
        const res = await fetch_searchContent(searchQuery);
        if (!res.ok) return console.log(res);
        dispatchAppState({
          type: "updateContent",
          payload: {
            allFolders: res.data.searchFolder,
            allFiles: res.data.searchFile,
            folderPath: [],
          },
        });
      } else {
        const res = await fetch_folderOpen(folderid);
        if (!res.ok) return console.log(res);
        dispatchAppState({
          type: "updateContent",
          payload: {
            allFolders: res.data.folder.children,
            allFiles: res.data.folder.files,
            folderPath: res.data.folder.folderPath,
          },
        });
      }

      setAppLoading(false);
    };

    openFolder();
  }, [folderid, searchParams]);

  const updateAppUI = async (initialLoading = true) => {
    setAppLoading(initialLoading);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const res = await fetch_searchContent(searchQuery);
      if (!res.ok) return console.log(res);
      dispatchAppState({
        type: "updateContent",
        payload: {
          allFolders: res.data.searchFolder,
          allFiles: res.data.searchFile,
          folderPath: [],
          folderStructure: res.data.folderStructure,
        },
      });
    } else {
      const res = await fetch_folderAllData(folderid);
      if (!res.ok) return console.log(res);

      dispatchAppState({
        type: "updateContent",
        payload: {
          allFolders: res.data.allFolders,
          allFiles: res.data.allFiles,
          folderPath: res.data.folderPath,
          folderStructure: res.data.folderStructure,
        },
      });
    }
    setAppLoading(false);
  };

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

    await updateAppUI();
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

    await updateAppUI();
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
        updateAppUI,
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
