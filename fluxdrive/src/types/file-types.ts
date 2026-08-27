import type { ResponseType } from "./api-types";
import type { FolderType } from "./folder-types";

export type FileType = {
  id: string;
  name: string;
  mimeType: string;
  fileType: string;
  fileUrl: string;
  size: number;
  publicId: string;
  folderId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchFileAddType = (
  files: File[],
  folderId: string,
) => Promise<
  ResponseType & {
    data: { files: FileType[]; allFolders: FolderType[]; allFiles: FileType[] };
  }
>;

export type FetchFileUpdateType = ({
  id,
  name,
  folderId,
}: {
  id: string;
  name?: string;
  folderId?: string;
}) => Promise<
  ResponseType & {
    data: {
      updatedFile: FileType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;

export type FetchFileDeleteType = (id: string) => Promise<
  ResponseType & {
    data: {
      deletedFile: FileType;
      allFolders: FolderType[];
      allFiles: FileType[];
    };
  }
>;
