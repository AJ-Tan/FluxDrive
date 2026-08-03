import { backendApi } from "../configs/backend-api";
import type {
  FolderAddType,
  FolderAllType,
  FolderOpenType,
} from "../types/folder-types";

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

const folderAdd: FolderAddType = async (name, parentId) => {
  try {
    const data = await backendApi(
      `/folder/`,
      "POST",
      JSON.stringify({ name, parentId }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { folderAll, folderOpen, folderAdd };
