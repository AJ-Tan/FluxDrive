import { useState } from "react";
import useApp from "../../../../../../context/AppContext/useApp";
import { fileDelete } from "../../../../../../services/file-service";
import type { DeleteDialogDataType } from "../../FolderTable";
import { folderDelete } from "../../../../../../services/folder-service";

function DeleteItemDialog({
  deleteDialogRef,
  deleteDialogData,
}: {
  deleteDialogRef: React.RefObject<HTMLDialogElement | null>;
  deleteDialogData: DeleteDialogDataType;
}) {
  const [loading, setLoading] = useState(false);
  const { appState, dispatchAppState } = useApp();
  const { id, type } = deleteDialogData;

  const itemData =
    deleteDialogData.type === "folder"
      ? appState.allFolders.find((i) => i.id === deleteDialogData.id)
      : appState.allFiles.find((i) => i.id === deleteDialogData.id);
  const closeDialog = () => {
    const folderDialog = deleteDialogRef.current;
    if (!folderDialog) return;
    folderDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const res =
      type === "folder" ? await folderDelete(id) : await fileDelete(id);
    setLoading(false);
    if (!res.ok) return console.log(res);
    closeDialog();
    dispatchAppState({
      type: "updateData",
      payload: { allFolders: res.data.allFolders, allFiles: res.data.allFiles },
    });
  };

  return (
    <dialog
      ref={deleteDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Delete {type === "folder" ? "Folder" : "File"}</h2>
        <div className="dialog-details">
          {itemData && (
            <>
              <div className="icon-container">O</div>
              <span>{itemData.name}</span>
            </>
          )}
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
