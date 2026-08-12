import "./buttonNew.css";
import FolderAddIcon from "../../../../../../assets/icons/add-folder.svg?react";
import FileAddIcon from "../../../../../../assets/icons/add-file.svg?react";
import { useEffect, memo, useRef, useState } from "react";
import AddFolderDialog from "../../../../components/AddFolderDialog/AddFolderDialog";
import { fileAdd } from "../../../../../../services/file-service";
import { useParams } from "react-router";
import useAuth from "../../../../../../context/AuthContext/useAuth";
import useUpload from "../../../../../../context/UploadContext/useUpload";
import useApp from "../../../../../../context/AppContext/useApp";

function ButtonNew() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const folderDialogRef = useRef<HTMLDialogElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { folderid } = useParams();
  const { user } = useAuth();
  const { dispatchAppState } = useApp();
  const { dispatchUploadState } = useUpload();

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

  const addFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    input.onchange = async (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;

      const fileFolderId = folderid ? folderid : `${user?.id}-1`;
      const files = [...(target.files || [])].map((file) => ({
        id: crypto.randomUUID(),
        folderId: fileFolderId,
        file,
      }));

      if (files.length <= 0) return;

      dispatchUploadState({ type: "add", payload: files });

      files.forEach(async (item) => {
        const res = await fileAdd(item.file, item.folderId);

        if (!res.ok && res.name === "ValidationError") {
          alert(`File to be uploaded must not exceed 10MB.`);
          dispatchUploadState({ type: "remove", payload: item.id });
          return;
        }
        if (!res.ok) return console.log(res);
        dispatchAppState({
          type: "updateData",
          payload: {
            allFolders: res.data.allFolders,
            allFiles: res.data.allFiles,
          },
        });
        dispatchUploadState({
          type: "setComplete",
          payload: { id: item.id, url: res.data.files[0].fileUrl },
        });
      });
    };

    setDisplayPopup(false);
    input.click();
  };

  return (
    <div ref={containerRef} className="btn-new-container">
      <AddFolderDialog ref={folderDialogRef} />
      <button
        className="btn-new"
        onClick={() => setDisplayPopup(true)}
        aria-haspopup="menu"
        aria-expanded={displayPopup}
      >
        <div className="icon">+</div>New
      </button>
      <div
        role="menu"
        className={`popup-controls${displayPopup ? " show" : ""}`}
      >
        <button
          className="popup-control-item"
          type="button"
          onClick={openFolderDialog}
          role="menuitem"
        >
          <div className="icon-container">
            <FolderAddIcon />
          </div>
          New Folder
        </button>
        <button
          className="popup-control-item"
          type="button"
          onClick={addFile}
          role="menuitem"
        >
          <div className="icon-container">
            <FileAddIcon />
          </div>
          File Upload
        </button>
      </div>
    </div>
  );
}

export default memo(ButtonNew);
