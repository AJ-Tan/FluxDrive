import { useState } from "react";
import "./folderItem.css";
import DownwardTriangle from "../../../../../../assets/icons/arrow-down-filled-triangle.svg?react";
// import folderIcon from "../../../../../../assets/aside-nav/folder.png";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";
import type { FolderStructureType } from "../../../../../../types/folder-types";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../../../../context/AuthContext/useAuth";
import useApp from "../../../../../../context/AppContext/useApp";

function FolderItem({
  folder,
  index,
}: {
  folder: FolderStructureType;
  index: number;
}) {
  const [expand, setExpand] = useState(false);
  const { user } = useAuth();
  const { dispatchAppState } = useApp();
  const { folderid } = useParams();
  const navigate = useNavigate();

  const activeFolder = folderid || `${user?.id}-1`;

  const handleClick = () => {
    if (!folder.id) return;
    dispatchAppState({ type: "setSearch", payload: "" });
    const baseFolderId = `${user?.id}-1`;
    navigate(baseFolderId === folder.id ? "/app" : `/app/folders/${folder.id}`);
  };

  const clickEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      !(
        e.target instanceof HTMLDivElement &&
        e.target.className === "icon-container arrow"
      )
    ) {
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
          type="button"
          className="btn-arrow"
          onClick={() => setExpand((prev) => !prev)}
          tabIndex={-1}
          aria-label={`Expand ${folder.name}.`}
          aria-expanded={expand}
        >
          {/* <img src={arrowIcon} alt="" /> */}
          <div className="icon-container arrow">
            <DownwardTriangle />
          </div>
        </button>
        <div className="icon-container folder">
          {/* <img src={folderIcon} alt="" /> */}
          <FolderIcon />
        </div>
        <span className="folder-name">{folder.name}</span>
      </div>
      {folder.children?.length > 0 && (
        <div className="folder-nav-children">
          {folder.children.map((c: FolderStructureType) => (
            <FolderItem key={c.id} folder={c} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
