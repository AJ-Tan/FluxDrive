import { backendApi } from "../configs/backend-api";
import type {
  FolderAddType,
  FolderAllType,
  FolderDeleteType,
  FolderOpenType,
  FolderUpdateType,
  FolderUploadType,
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

const folderAdd: FolderAddType = async (name, parentId, id) => {
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

const folderUpload: FolderUploadType = async (folderItems) => {
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

const folderUpdate: FolderUpdateType = async ({ id, name, parentId }) => {
  try {
    const data = await backendApi(
      `/folder/${id}`,
      "PUT",
      JSON.stringify({ ...(name && { name }), ...(parentId && { parentId }) }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const folderDelete: FolderDeleteType = async (id) => {
  try {
    const data = await backendApi(`/folder/${id}`, "DELETE");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export {
  folderAll,
  folderOpen,
  folderUpload,
  folderAdd,
  folderUpdate,
  folderDelete,
};
