import type { ResponseType } from "./api-types";
import type { FileType } from "./file-types";

export type FolderType = {
  id: string;
  name: string;
  parentId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  parent: null;
  files: FileType[];
  children: FolderType[];
  folderPath: { id: string; name: string }[];
};

export type FolderAllType = () => Promise<
  ResponseType & { data: { allFolders: FolderType[]; allFiles: FileType[] } }
>;

export type FolderOpenType = (
  folderId: string,
) => Promise<ResponseType & { data: { folder: FolderType } }>;

export type FolderAddType = (
  name: string,
  folderId: string,
) => Promise<
  ResponseType & {
    data: {
      folder: FolderType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;
