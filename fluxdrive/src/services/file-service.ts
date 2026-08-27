import { backendApi } from "../configs/backend-api";
import type {
  FetchFileAddType,
  FetchFileDeleteType,
  FetchFileUpdateType,
} from "../types/file-types";

const fetch_fileAdd: FetchFileAddType = async (files, folderId) => {
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

const fetch_fileUpdate: FetchFileUpdateType = async ({
  id,
  name,
  folderId,
}) => {
  try {
    const data = await backendApi(
      `/file/${id}`,
      "PUT",
      JSON.stringify({ name, ...(folderId && { folderId }) }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_fileDelete: FetchFileDeleteType = async (id) => {
  try {
    const data = await backendApi(`/file/${id}`, "DELETE");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetch_fileAdd, fetch_fileUpdate, fetch_fileDelete };
