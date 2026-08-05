import "./buttonNew.css";
import folderAddIcon from "../../../../../../assets/icons/folder-add.png";
import fileAddIcon from "../../../../../../assets/icons/file-add.png";
import { useEffect, memo, useRef, useState } from "react";
import FolderDialog from "../../../../components/FolderDialog/FolderDialog";
import { fileAdd } from "../../../../../../services/file-service";
import { useParams } from "react-router";
import useAuth from "../../../../../../context/AuthContext/useAuth";
import useApp from "../../../../../../context/AppContext/useApp";

function ButtonNew() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const folderDialogRef = useRef<HTMLDialogElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { folderid } = useParams();
  const { user } = useAuth();
  const { dispatchAppState, dispatchUploadState } = useApp();

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
        if (!res.ok) return console.log(res);
        dispatchAppState({
          type: "updateData",
          payload: {
            allFolders: res.data.allFolders,
            allFiles: res.data.allFiles,
          },
        });
        dispatchUploadState({ type: "setComplete", payload: item.id });
      });
    };

    setDisplayPopup(false);
    input.click();
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
        <button type="button" onClick={addFile}>
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
