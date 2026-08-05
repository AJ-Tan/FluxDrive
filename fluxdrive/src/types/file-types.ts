import type { ResponseType } from "./api-types";
import type { FolderType } from "./folder-types";

export type FileType = {
  id: string;
  name: string;
  mimeType: string;
  fileType: string;
  fileUrl: string;
  publicId: string;
  folderId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type FileAddType = (
  file: File,
  parentId: string,
) => Promise<
  ResponseType & {
    data: { files: FileType[]; allFolders: FolderType[]; allFiles: FileType[] };
  }
>;
