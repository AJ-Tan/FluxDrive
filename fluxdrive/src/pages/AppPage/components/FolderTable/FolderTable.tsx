import { memo, useRef, useState } from "react";
import DownArrow from "../../../../assets/icons/down-arrow.svg?react";
import UpArrow from "../../../../assets/icons/up-arrow.svg?react";
import "./folderTable.css";
import TableItem from "./components/TableItem/TableItem";
import RenameItemDialog from "./components/RenameItemDialog/RenameItemDialog";
import DeleteItemDialog from "./components/DeleteItemDialog/DeleteItemDialog";
import type { AllContentItemType } from "../../../../context/AppContext/AppProvider";

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

function FolderTable({ tableData }: { tableData: AllContentItemType[] }) {
  const [sort, setSort] = useState<SortType>({
    column: "date",
    type: "desc",
  });
  const renameDialogRef = useRef<HTMLDialogElement | null>(null);
  const [renameDialogData, setRenameDialogData] =
    useState<RenameDialogDataType>({
      id: "",
      type: "folder",
      values: { name: "" },
    });
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
  const [deleteDialogData, setDeleteDialogData] =
    useState<DeleteDialogDataType>([]);

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
      <table className="tbl-folder-content">
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
              renameDialog={{
                ref: renameDialogRef,
                data: renameDialogData,
                setData: setRenameDialogData,
              }}
              deleteDialog={{
                ref: deleteDialogRef,
                data: deleteDialogData,
                setData: setDeleteDialogData,
              }}
            />
          ))}
        </tbody>
      </table>
      <RenameItemDialog
        renameDialogRef={renameDialogRef}
        renameDialogData={renameDialogData}
        setRenameDialogData={setRenameDialogData}
      />
      <DeleteItemDialog
        deleteDialogRef={deleteDialogRef}
        deleteDialogData={deleteDialogData}
      />
    </>
  );
}

export default memo(FolderTable);
