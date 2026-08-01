import { backendApi } from "../configs/backend-api";
import type { FolderAllType, FolderOpenType } from "../types/folder-types";

const folderAll: FolderAllType = async () => {
  try {
    const data = await backendApi(`/folder/`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const folderOpen: FolderOpenType = async (folderId) => {
  try {
    const data = await backendApi(`/folder/${folderId}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { folderAll, folderOpen };
