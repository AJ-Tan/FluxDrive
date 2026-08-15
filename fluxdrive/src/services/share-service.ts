import { backendApi } from "../configs/backend-api";
import type { FetchSharedFolderType } from "../types/share-types";

const fetchSharedFolder: FetchSharedFolderType = async (shareId) => {
  try {
    const data = await backendApi(`/folderShare/${shareId}`, "GET");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchSharedFolder };
