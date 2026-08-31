import { memo, useRef, useState } from "react";
import DownArrow from "../../../../assets/icons/down-arrow.svg?react";
import UpArrow from "../../../../assets/icons/up-arrow.svg?react";
import "./folderTable.css";
import TableItem from "./components/TableItem/TableItem";
import RenameItemDialog from "./components/RenameItemDialog/RenameItemDialog";
import DeleteItemDialog from "./components/DeleteItemDialog/DeleteItemDialog";
import type { AllContentItemType } from "../../../../context/AppContext/AppProvider";
import useApp from "../../../../context/AppContext/useApp";
import { useParams, useSearchParams } from "react-router";
import useAuth from "../../../../context/AuthContext/useAuth";
import ShareLinkDialog from "./components/ShareLinkDialog/ShareLinkDialog";
import loadingGIF from "../../../../assets/gifs/loading.gif";

type SortType = {
  column: "default" | "name" | "date" | "size";
  type: "asc" | "desc";
};

export type RenameDialogDataType = {
  id: string;
  type: "folder" | "file";
  values: {
    name: string;
  };
};

export type DeleteDialogDataType = {
  id: string;
  type: "folder" | "file";
}[];

export type SelectedItemType = {
  id: string;
  type: "folder" | "file";
} | null;

function FolderTable({ tableData }: { tableData: AllContentItemType[] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [sort, setSort] = useState<SortType>({
    column: "date",
    type: "desc",
  });
  const { appLoading, uploadFile, uploadFolder } = useApp();
  const renameDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const shareLinkDialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null);
  const { user } = useAuth();
  const { folderid } = useParams();
  const currentFolderId = folderid ? folderid : `${user?.id}-1`;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const handleDragOver = (e: React.DragEvent<HTMLTableElement>) => {
    e.preventDefault();
    if (searchQuery) return;

    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLTableElement>) => {
    e.preventDefault();
    if (searchQuery) return;

    const container = e.currentTarget;
    if (
      e.relatedTarget instanceof Node &&
      container.contains(e.relatedTarget)
    ) {
      return;
    }

    setIsDragging(false);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (searchQuery) return;

    setIsDragging(false);
    const items = Array.from(e.dataTransfer.items);

    const isDirectoryEntry = (
      entry: FileSystemEntry,
    ): entry is FileSystemDirectoryEntry =>
      "createReader" in entry && entry.isDirectory;

    const isFileEntry = (
      entry: FileSystemEntry,
    ): entry is FileSystemFileEntry => "file" in entry && !entry.isDirectory;

    type FolderEntriesType = {
      id: string;
      parentId: string;
      name: string;
      files: File[];
    };
    const readFolder = async (
      folderEntry: FileSystemDirectoryEntry,
      parentId = currentFolderId,
    ) => {
      const reader = folderEntry.createReader();
      const entries = await new Promise<FileSystemEntry[]>((resolve, reject) =>
        reader.readEntries(resolve, reject),
      );
      const id = crypto.randomUUID();
      const files: File[] = [];
      const folderEntries: FolderEntriesType[] = [];

      for (const itemEntry of entries) {
        if (isDirectoryEntry(itemEntry)) {
          folderEntries.push(...(await readFolder(itemEntry, id)));
        } else if (isFileEntry(itemEntry)) {
          files.push(await getFile(itemEntry));
        }
      }

      return [
        { id, parentId, name: folderEntry.name, files },
        ...folderEntries,
      ];
    };

    const entries = items
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemEntry => entry !== null);

    const promises = entries.map(async (entry) => {
      if (isDirectoryEntry(entry)) {
        return { type: "folder" as const, item: await readFolder(entry) };
      } else if (isFileEntry(entry)) {
        return { type: "file" as const, item: await getFile(entry) };
      }
    });

    const droppedItems = await Promise.all(promises);

    for (const i of droppedItems) {
      if (!i) continue;
      if (i.type === "file") {
        uploadFile(i.item, currentFolderId);
      } else if (i.type === "folder") {
        uploadFolder(i.item);
      }
    }
  };

  const getFile = (entry: FileSystemFileEntry): Promise<File> => {
    return new Promise((resolve, reject) => {
      entry.file(resolve, reject);
    });
  };

  const toggleSort = (column: "default" | "name" | "date" | "size") => {
    setSort((prev) => ({
      column,
      type:
        prev.column !== column ? "desc" : prev.type === "asc" ? "desc" : "asc",
    }));
  };

  switch (sort.column) {
    case "name":
      tableData.sort((a, b) => {
        const compare = a.name.localeCompare(b.name);
        return sort.type === "asc" ? compare : -compare;
      });
      break;
    case "date":
      tableData.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        const diff = dateA - dateB;
        return sort.type === "asc" ? diff : -diff;
      });
      break;
    case "size":
      tableData.sort((a, b) => {
        const sizeA = "size" in a ? a.size || 0 : 0;
        const sizeB = "size" in b ? b.size || 0 : 0;
        const diff = sizeA - sizeB;
        return sort.type === "asc" ? diff : -diff;
      });
      break;
  }

  tableData.sort((a, b) => {
    const typeA = a.type;
    const typeB = b.type;
    const compare = typeA.localeCompare(typeB);
    return sort.type === "asc" ? -compare : -compare;
  });

  return (
    <>
      <div
        className={`tbl-container${isDragging ? " drag" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {appLoading ? (
          <img className="tbl-loading" src={loadingGIF} alt="" />
        ) : tableData.length > 0 ? (
          <table className={`tbl-folder-content`}>
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => toggleSort("name")}>
                    Name
                    {sort.column === "name" && (
                      <div className="icon-container">
                        {sort.type === "asc" ? <UpArrow /> : <DownArrow />}
                      </div>
                    )}
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => toggleSort("date")}>
                    Date Modified
                    {sort.column === "date" && (
                      <div className="icon-container">
                        {sort.type === "asc" ? <UpArrow /> : <DownArrow />}
                      </div>
                    )}
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => toggleSort("size")}>
                    File Size
                    {sort.column === "size" && (
                      <div className="icon-container">
                        {sort.type === "asc" ? <UpArrow /> : <DownArrow />}
                      </div>
                    )}
                  </button>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <TableItem
                  key={item.id}
                  item={item}
                  renameDialogRef={renameDialogRef}
                  deleteDialogRef={deleteDialogRef}
                  shareLinkDialogRef={shareLinkDialogRef}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </tbody>
          </table>
        ) : searchQuery ? (
          <p>No search result.</p>
        ) : (
          <div className="tbl-empty">
            <b>Drop files here</b>
            <span>or use the 'New' button.</span>
          </div>
        )}
      </div>

      <RenameItemDialog
        renameDialogRef={renameDialogRef}
        selectedItem={selectedItem}
      />
      <DeleteItemDialog
        deleteDialogRef={deleteDialogRef}
        selectedItem={selectedItem}
      />
      <ShareLinkDialog
        shareLinkDialogRef={shareLinkDialogRef}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default memo(FolderTable);
