import { backendApi } from "../configs/backend-api";
import type {
  FetchFolderAddType,
  FetchFolderAllDataType,
  FetchFolderDeleteType,
  FolderOpenType,
  FetchFolderUpdateType,
  FetchFolderUploadType,
  FetchFolderStructureType,
} from "../types/folder-types";

const fetch_folderAllData: FetchFolderAllDataType = async (folderId) => {
  try {
    const data = await backendApi(`/folder/allData/${folderId || ""}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderOpen: FolderOpenType = async (folderId) => {
  try {
    const data = await backendApi(`/folder/${folderId || ""}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderStructure: FetchFolderStructureType = async () => {
  try {
    const data = await backendApi(`/folder/folderStructure`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderAdd: FetchFolderAddType = async (name, parentId, id) => {
  try {
    const data = await backendApi(
      `/folder/`,
      "POST",
      JSON.stringify({ name, parentId, ...(id && { id }) }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderUpload: FetchFolderUploadType = async (folderItems) => {
  try {
    const maxSize = 10 * 1024 * 1024;

    for (const item of folderItems) {
      const formData = new FormData();
      formData.append("folderId", item.id);
      formData.append("name", item.name);
      formData.append("parentId", item.parentId);

      for (const file of item.files) {
        if (file.size <= maxSize) formData.append("files", file);
      }

      await backendApi(`/folder/upload`, "POST", formData, {});
    }

    const data = await backendApi(`/folder/`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderUpdate: FetchFolderUpdateType = async ({
  id,
  name,
  parentId,
}) => {
  try {
    const data = await backendApi(
      `/folder/${id}`,
      "PUT",
      JSON.stringify({ name, ...(parentId && { parentId }) }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_folderDelete: FetchFolderDeleteType = async (id) => {
  try {
    const data = await backendApi(`/folder/${id}`, "DELETE");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export {
  fetch_folderAllData,
  fetch_folderOpen,
  fetch_folderStructure,
  fetch_folderUpload,
  fetch_folderAdd,
  fetch_folderUpdate,
  fetch_folderDelete,
};
