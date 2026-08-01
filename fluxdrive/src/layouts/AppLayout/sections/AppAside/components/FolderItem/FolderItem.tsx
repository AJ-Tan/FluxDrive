import arrowIcon from "../../../../../../assets/aside-nav/down-arrow.png";
import folderIcon from "../../../../../../assets/aside-nav/folder.png";
import "./folderItem.css";
import { useState } from "react";
import type { AsideFoldersType } from "../../../../../../context/AppContext/AppContext";
import useApp from "../../../../../../context/AppContext/useApp";

function FolderItem({
  folder,
  index,
}: {
  folder: AsideFoldersType;
  index: number;
}) {
  const [expand, setExpand] = useState(false);
  const {
    selectedFolder: [selectedFolder, setSelectedFolder],
  } = useApp();

  const handleClick = () => {
    if (!folder.id) return;
    setSelectedFolder(folder);
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
        className={`folder-nav-control${selectedFolder?.id === folder.id ? " selected" : ""}`}
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
      {folder.children.length > 0 && (
        <div className="folder-nav-children">
          {folder.children.map((c: AsideFoldersType) => (
            <FolderItem key={c.id} folder={c} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
