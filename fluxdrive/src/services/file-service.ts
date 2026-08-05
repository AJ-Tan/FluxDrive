import { backendApi } from "../configs/backend-api";
import type { FileAddType } from "../types/file-types";

const fileAdd: FileAddType = async (file, folderId) => {
  try {
    const formData = new FormData();
    formData.append("folderId", folderId);
    formData.append("files", file);
    const data = await backendApi(`/file`, "POST", formData, {});
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fileAdd };
