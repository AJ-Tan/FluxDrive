import { backendApi } from "../configs/backend-api";
import type {
  FetchSharedFolderType,
  GenerateFolderShareType,
} from "../types/share-types";

const fetchSharedFolder: FetchSharedFolderType = async (shareId) => {
  try {
    const data = await backendApi(`/folderShare/${shareId}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const generateFolderShare: GenerateFolderShareType = async (id, expire) => {
  try {
    const data = await backendApi(
      `/folderShare/${id}?expire=${expire}`,
      "POST",
    );
    return data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchSharedFolder, generateFolderShare };
