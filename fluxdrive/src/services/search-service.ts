import { backendApi } from "../configs/backend-api";
import type { FetchSearchContent } from "../types/search-types";

export const fetch_searchContent: FetchSearchContent = async (searchText) => {
  try {
    const data = await backendApi(
      `/search`,
      "POST",
      JSON.stringify({ searchText }),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
