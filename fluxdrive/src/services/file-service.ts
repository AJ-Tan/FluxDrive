import { backendApi } from "../configs/backend-api";
import type {
  FileAddType,
  FileDeleteType,
  FileUpdateType,
} from "../types/file-types";

const fileAdd: FileAddType = async (files, folderId) => {
  try {
    const formData = new FormData();

    formData.append("folderId", folderId);

    for (const file of files) {
      formData.append("files", file);
    }

    const data = await backendApi(`/file`, "POST", formData, {});
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fileUpdate: FileUpdateType = async ({ id, name, folderId }) => {
  try {
    const data = await backendApi(
      `/file/${id}`,
      "PUT",
      JSON.stringify({ ...(name && { name }), ...(folderId && { folderId }) }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fileDelete: FileDeleteType = async (id) => {
  try {
    const data = await backendApi(`/file/${id}`, "DELETE");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fileAdd, fileUpdate, fileDelete };
