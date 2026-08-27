import { useState } from "react";
import useApp from "../../../../../../context/AppContext/useApp";
import { fetch_fileDelete } from "../../../../../../services/file-service";
import { fetch_folderDelete } from "../../../../../../services/folder-service";
import "./deleteItemDialog.css";
import MyFileIcon from "../../../../../../components/MyFileIcon/MyFileIcon";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";
import type { SelectedItemType } from "../../FolderTable";

function DeleteItemDialog({
  deleteDialogRef,
  selectedItem,
}: {
  deleteDialogRef: React.RefObject<HTMLDialogElement | null>;
  selectedItem: SelectedItemType;
}) {
  const [loading, setLoading] = useState(false);
  const { appState, dispatchAppState } = useApp();

  const fetchedItem =
    selectedItem?.type === "folder"
      ? appState.allFolders.find((i) => i.id === selectedItem?.id)
      : appState.allFiles.find((i) => i.id === selectedItem?.id);

  const closeDialog = () => {
    const folderDialog = deleteDialogRef.current;
    if (!folderDialog) return;
    folderDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);
    const res =
      selectedItem?.type === "folder"
        ? await fetch_folderDelete(selectedItem?.id)
        : await fetch_fileDelete(selectedItem?.id);
    setLoading(false);
    if (!res.ok) return console.log(res);
    closeDialog();
    dispatchAppState({
      type: "updateData",
      payload: {
        allFolders: res.data.allFolders,
        allFiles: res.data.allFiles,
      },
    });
  };

  return (
    <dialog
      ref={deleteDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Delete Items</h2>

        <div className="item-details">
          <div className="item-icon">
            {selectedItem?.type === "file" ? (
              <MyFileIcon fileName={fetchedItem?.name || ""} />
            ) : (
              <div className="icon-container">
                <FolderIcon />
              </div>
            )}
          </div>
          <span>{fetchedItem?.name}</span>
        </div>

        <div className="form-controls">
          <button type="button" onClick={closeDialog}>
            Cancel
          </button>
          <button type="submit">Delete</button>
        </div>
      </form>
    </dialog>
  );
}

export default DeleteItemDialog;
