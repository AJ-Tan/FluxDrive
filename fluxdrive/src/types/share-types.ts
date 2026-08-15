import type { ResponseType } from "./api-types";
import type { FileType } from "./file-types";
import type { FolderType } from "./folder-types";

type FolderShareType = {
  id: string;
  expiresAt: string;
  folderId: string;
  ownerId: string;
  createdAt: string;
  folder: FolderType;
};

export type ShareDataType = {
  folderShare: FolderShareType;
  allFolders: FolderType[];
  allFiles: FileType[];
};

export type FetchSharedFolderType = (
  shareId: string,
  folderId?: string,
) => Promise<
  ResponseType & {
    data: ShareDataType;
  }
>;
