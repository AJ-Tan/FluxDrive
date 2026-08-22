import { useState } from "react";
import DownArrow from "../../../../assets/icons/down-arrow.svg?react";
import UpArrow from "../../../../assets/icons/up-arrow.svg?react";
import FolderIcon from "../../../../assets/icons/folder.svg?react";
import type { AllContentItemType } from "../../../../context/AppContext/AppProvider";
import MyFileIcon from "../../../../components/MyFileIcon/MyFileIcon";
import {
  fileSizeText,
  formattedDate,
} from "../../../../utils/common-functions";
import { useNavigate, useParams } from "react-router";

type SortType = {
  column: "default" | "name" | "date" | "size";
  type: "asc" | "desc";
};

function SharePageTable({ tableData }: { tableData: AllContentItemType[] }) {
  const [sort, setSort] = useState<SortType>({
    column: "date",
    type: "desc",
  });
  const navigate = useNavigate();
  const { shareid } = useParams();

  const toggleSort = (column: "default" | "name" | "date" | "size") => {
    setSort((prev) => ({
      column,
      type:
        prev.column !== column ? "desc" : prev.type === "asc" ? "desc" : "asc",
    }));
  };
  const openFolder = (id: string) => {
    navigate(`/share/${shareid}/${id}`);
  };
  const openFile = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
    <div className="tbl-container">
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
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr
              key={`share-${item.id}`}
              className={`tbl-row`}
              onDoubleClick={() =>
                item.type === "file"
                  ? openFile(item.fileUrl)
                  : openFolder(item.id)
              }
            >
              <td>
                <div className="item-details">
                  <div className="item-icon">
                    {item.type === "file" ? (
                      <MyFileIcon fileName={item.name} />
                    ) : (
                      <div className="icon-container">
                        <FolderIcon />
                      </div>
                    )}
                  </div>
                  <span className="item-name">{item.name}</span>
                </div>
              </td>
              <td>
                <span>{formattedDate(item.createdAt)}</span>
              </td>
              <td>
                <span>
                  {item.type === "file" ? fileSizeText(item.size) : "--"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SharePageTable;
