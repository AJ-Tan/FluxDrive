import "./buttonNew.css";
import FileAddIcon from "../../../../../../assets/icons/file-add.svg?react";
import FolderAddIcon from "../../../../../../assets/icons/folder-add.svg?react";
import FolderUploadIcon from "../../../../../../assets/icons/folder-upload.svg?react";
import { useEffect, memo, useRef, useState } from "react";
import AddFolderDialog from "../../../../components/AddFolderDialog/AddFolderDialog";
import { useParams } from "react-router";
import useAuth from "../../../../../../context/AuthContext/useAuth";
import useApp from "../../../../../../context/AppContext/useApp";
import type { FolderItemsType } from "../../../../../../types/folder-types";

function ButtonNew() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const folderDialogRef = useRef<HTMLDialogElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { folderid } = useParams();
  const { user } = useAuth();
  const { uploadFile, uploadFolder } = useApp();

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
        folderId: fileFolderId,
        file,
      }));

      if (files.length <= 0) return;

      files.forEach(async (item) => {
        uploadFile(item.file, item.folderId);
      });
    };

    setDisplayPopup(false);
    input.click();
  };

  const addFolder = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.setAttribute("webkitdirectory", "");
    input.setAttribute("directory", "");
    input.multiple = true;

    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;

      if (!target.files) return;

      const folderItems = [...target.files].reduce<FolderItemsType[]>(
        (prev, i) => {
          const folderName = i.webkitRelativePath.split("/").at(-2) || "";
          const folder = prev.find((i) => i.name === folderName);

          if (folder) {
            folder.files.push(i);
          } else {
            const parentName = i.webkitRelativePath.split("/").at(-3);
            if (!parentName) {
              prev.push({
                id: crypto.randomUUID(),
                name: folderName,
                parentId: folderid || "",
                files: [i],
              });
            } else {
              const parentFolder = prev.find((i) => i.name === parentName);
              if (parentFolder)
                prev.push({
                  id: crypto.randomUUID(),
                  name: folderName,
                  parentId: parentFolder.id,
                  files: [i],
                });
            }
          }

          return prev;
        },
        [],
      );
      if (folderItems.length <= 0) return;

      uploadFolder(folderItems);
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
          onClick={addFolder}
          role="menuitem"
        >
          <div className="icon-container icon-folder-upload">
            <FolderUploadIcon />
          </div>
          Folder Upload
        </button>
        <button
          className="popup-control-item"
          type="button"
          onClick={addFile}
          role="menuitem"
        >
          <div className="icon-container icon-file-add">
            <FileAddIcon />
          </div>
          File Upload
        </button>
      </div>
    </div>
  );
}

export default memo(ButtonNew);
