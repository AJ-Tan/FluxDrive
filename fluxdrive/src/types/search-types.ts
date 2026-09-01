import type { ResponseType } from "./api-types";
import type { FileType } from "./file-types";
import type { FolderStructureType, FolderType } from "./folder-types";

export type FetchSearchContent = (searchText: string) => Promise<
  ResponseType & {
    data: {
      searchFolder: FolderType[];
      searchFile: FileType[];
      folderStructure: FolderStructureType;
    };
  }
>;
