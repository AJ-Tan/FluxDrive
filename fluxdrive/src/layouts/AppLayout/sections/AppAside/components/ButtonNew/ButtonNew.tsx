import "./buttonNew.css";
import folderAddIcon from "../../../../../../assets/icons/folder-add.png";
import fileAddIcon from "../../../../../../assets/icons/file-add.png";
import { useEffect, memo, useRef, useState } from "react";
import FolderDialog from "../../../../components/FolderDialog/FolderDialog";

function ButtonNew() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const folderDialogRef = useRef<HTMLDialogElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEvent = (e: PointerEvent) => {
      const container = containerRef.current;

      if (!container) return;
      if (!(e.target instanceof HTMLElement)) return;

      if (!container.contains(e.target)) {
        setDisplayPopup(false);
      }
    };

    document.addEventListener("click", handleEvent);
    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, []);

  const openFolderDialog = () => {
    const folderDialog = folderDialogRef.current;
    if (!folderDialog) return;
    setDisplayPopup(false);
    folderDialog.showModal();
  };

  return (
    <div ref={containerRef} className="btn-new-container">
      <FolderDialog ref={folderDialogRef} />
      <button className="btn-new" onClick={() => setDisplayPopup(true)}>
        <div className="icon">+</div>New
      </button>
      <div className={`popup${displayPopup ? " show" : ""}`}>
        <button type="button" onClick={openFolderDialog}>
          <div className="icon-container">
            <img src={folderAddIcon} alt="" />
          </div>
          New Folder
        </button>
        <button type="button">
          <div className="icon-container">
            <img src={fileAddIcon} alt="" />
          </div>
          File Upload
        </button>
      </div>
    </div>
  );
}

export default memo(ButtonNew);
