import { useCallback, useState } from "react";
import useApp from "../../../../../../context/AppContext/useApp";
import TextField from "../../../../../../components/Inputs/Textfield/TextField";
import { folderUpdate } from "../../../../../../services/folder-service";
import { fileUpdate } from "../../../../../../services/file-service";
import type { RenameDialogDataType } from "../../FolderTable";

function RenameItemDialog({
  renameDialogRef,
  renameDialogData,
  setRenameDialogData,
}: {
  renameDialogRef: React.RefObject<HTMLDialogElement | null>;
  renameDialogData: RenameDialogDataType;
  setRenameDialogData: React.Dispatch<
    React.SetStateAction<RenameDialogDataType>
  >;
}) {
  const [loading, setLoading] = useState(false);
  const { dispatchAppState } = useApp();
  const {
    id,
    type,
    values: { name },
  } = renameDialogData;

  const setValue = useCallback(
    (id: string, value: string) => {
      setRenameDialogData((prev) => ({
        ...prev,
        values: { ...prev.values, [id]: value },
      }));
    },
    [setRenameDialogData],
  );

  const closeDialog = () => {
    const folderDialog = renameDialogRef.current;
    if (!folderDialog) return;
    folderDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const res =
      type === "folder"
        ? await folderUpdate({ id, name })
        : await fileUpdate({ id, name });
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
      ref={renameDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Rename {type === "folder" ? "Folder" : "File"}</h2>
        <TextField id="name" value={name} setValue={setValue} />
        <div className="form-controls">
          <button type="button" onClick={closeDialog}>
            Cancel
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </dialog>
  );
}

export default RenameItemDialog;
