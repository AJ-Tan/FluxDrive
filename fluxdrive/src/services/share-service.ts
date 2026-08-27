import { backendApi } from "../configs/backend-api";
import type {
  FetchSharedFolderType,
  FetchGenerateFolderShareType,
} from "../types/share-types";

const fetch_SharedFolder: FetchSharedFolderType = async (shareId) => {
  try {
    const data = await backendApi(`/folderShare/${shareId}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetch_generateFolderShare: FetchGenerateFolderShareType = async (
  id,
  expire,
) => {
  try {
    const data = await backendApi(
      `/folderShare/${id}?expire=${expire}`,
      "POST",
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetch_SharedFolder, fetch_generateFolderShare };
