import { useState } from "react";
import useApp from "../../../../../../context/AppContext/useApp";
import { fileDelete } from "../../../../../../services/file-service";
import type { DeleteDialogDataType } from "../../FolderTable";
import { folderDelete } from "../../../../../../services/folder-service";
import "./deleteItemDialog.css";
import MyFileIcon from "../../../../../../components/MyFileIcon/MyFileIcon";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";

function DeleteItemDialog({
  deleteDialogRef,
  deleteDialogData,
}: {
  deleteDialogRef: React.RefObject<HTMLDialogElement | null>;
  deleteDialogData: DeleteDialogDataType;
}) {
  const [loading, setLoading] = useState(false);
  const { appState, dispatchAppState } = useApp();

  const itemData = deleteDialogData.map((item) =>
    item.type === "folder"
      ? {
          ...appState.allFolders.find((i) => i.id === item.id),
          type: item.type,
        }
      : { ...appState.allFiles.find((i) => i.id === item.id), type: item.type },
  );

  const closeDialog = () => {
    const folderDialog = deleteDialogRef.current;
    if (!folderDialog) return;
    folderDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    itemData.forEach(async ({ id, type }) => {
      if (id) {
        const res =
          type === "folder" ? await folderDelete(id) : await fileDelete(id);
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
      }
    });
  };

  return (
    <dialog
      ref={deleteDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Delete Items</h2>

        {itemData &&
          itemData.length > 0 &&
          itemData.map(
            (item) =>
              item && (
                <div key={`delete-dialog-${item.id}`} className="item-details">
                  <div className="item-icon">
                    {item?.type === "file" ? (
                      <MyFileIcon fileName={item.name || ""} />
                    ) : (
                      <div className="icon-container">
                        <FolderIcon />
                      </div>
                    )}
                  </div>
                  <span>{item.name}</span>
                </div>
              ),
          )}

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
