import type { FileType } from "../../types/file-types";
import type { FolderType } from "../../types/folder-types";

export type AppStateType = {
  allFolders: FolderType[];
  allFiles: FileType[];
  focusedItem: {
    id: string;
    itemType: "folder" | "file";
  } | null;
};
