import { useState } from "react";
import "./folderItem.css";
import arrowIcon from "../../../../../../assets/aside-nav/down-arrow.png";
import folderIcon from "../../../../../../assets/aside-nav/folder.png";
import type { FolderType } from "../../../../../../types/folder-types";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../../../../context/AuthContext/useAuth";

function FolderItem({ folder, index }: { folder: FolderType; index: number }) {
  const [expand, setExpand] = useState(false);
  const { user } = useAuth();
  const { folderid } = useParams();
  const navigate = useNavigate();

  const activeFolder = folderid || `${user?.id}-1`;

  const handleClick = () => {
    if (!folder.id) return;
    const rootFolder = `${user?.id}-1`;
    navigate(`/app/folders/${folder.id !== rootFolder ? folder.id : ""}`);
  };

  const clickEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLImageElement)) {
      handleClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`folder-nav -inset-${index}`}
      key={folder.id}
      data-open={expand}
    >
      <div
        className={`folder-nav-control${activeFolder === folder.id ? " selected" : ""}`}
        role="button"
        onClick={clickEvent}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <button
          className="btn-arrow"
          onClick={() => setExpand((prev) => !prev)}
          tabIndex={-1}
        >
          <img src={arrowIcon} alt="" />
        </button>
        <div className="img-container" onClick={handleClick}>
          <img src={folderIcon} alt="" />
        </div>
        <span className="folder-name">{folder.name}</span>
      </div>
      {folder.children?.length > 0 && (
        <div className="folder-nav-children">
          {folder.children.map((c: FolderType) => (
            <FolderItem key={c.id} folder={c} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
