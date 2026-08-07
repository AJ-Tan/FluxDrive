import MyFileIcon from "../../../../components/MyFileIcon/MyFileIcon";
import type { FolderType } from "../../../../types/folder-types";
import {
  fileSizeText,
  formattedDate,
} from "../../../../utils/common-functions";
import "./folderTable.css";
import folderIcon from "../../../../assets/aside-nav/folder.png";
import { useNavigate } from "react-router";

function FolderTable({ folder }: { folder: FolderType | undefined }) {
  const navigate = useNavigate();

  const openFolder = (id: string) => {
    navigate(`/app/folders/${id}`);
  };

  const openFile = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <table className="tbl-folder-content">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Modified</th>
          <th>File Size</th>
          <th>Control</th>
        </tr>
      </thead>
      <tbody>
        {folder?.children.map((item) => (
          <tr key={item.id} onDoubleClick={() => openFolder(item.id)}>
            <td>
              <div className="icon-item">
                <img src={folderIcon} alt="" />
              </div>
              {item.name}
            </td>
            <td>{formattedDate(item.createdAt)}</td>
            <td>--</td>
            <td>
              <div className="tbl-controls">X</div>
            </td>
          </tr>
        ))}
        {folder?.files.map((item) => (
          <tr key={item.id} onDoubleClick={() => openFile(item.fileUrl)}>
            <td>
              <div className="icon-item">
                <MyFileIcon fileName={item.name} />
              </div>
              {item.name}
            </td>
            <td>{formattedDate(item.createdAt)}</td>
            <td>{fileSizeText(item.size)}</td>
            <td>
              <div className="tbl-controls">X</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FolderTable;
