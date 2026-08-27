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
  folderShare: FolderShareType[];
};

export type FolderShareType = {
  id: string;
  expiresAt: string;
  folderId: string;
  ownerId: string;
  createdAt: string;
};

export type FolderPathType = {
  id: string;
  name: string;
};

export type FolderContentType =
  | (FileType & { type: "file" })
  | (FolderType & { type: "folder" });

export type FetchFolderAllType = () => Promise<
  ResponseType & { data: { allFolders: FolderType[]; allFiles: FileType[] } }
>;

export type FolderOpenType = (
  folderId: string,
) => Promise<ResponseType & { data: { folder: FolderType } }>;

export type FolderStructureType = {
  id: string;
  name: string;
  children: FolderStructureType[];
};

export type FetchFolderStructureType = () => Promise<
  ResponseType & { data: { folderStructure: FolderStructureType } }
>;

export type FetchFolderAddType = (
  name: string,
  folderId: string,
  id?: string,
) => Promise<
  ResponseType & {
    data: {
      folder: FolderType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;

export type FolderItemsType = {
  id: string;
  name: string;
  parentId: string;
  files: File[];
};
export type FetchFolderUploadType = (folderItems: FolderItemsType[]) => Promise<
  ResponseType & {
    data: {
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;

export type FetchFolderUpdateType = ({
  id,
  name,
  parentId,
}: {
  id: string;
  name?: string;
  parentId?: string;
}) => Promise<
  ResponseType & {
    data: {
      updatedFolder: FolderType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;

export type FetchFolderDeleteType = (id: string) => Promise<
  ResponseType & {
    data: {
      deletedFolder: FolderType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;
