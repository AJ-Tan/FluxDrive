import { useCallback, useEffect, useState } from "react";
import useApp from "../../../../../../context/AppContext/useApp";
import TextField from "../../../../../../components/Inputs/Textfield/TextField";
import { fetch_folderUpdate } from "../../../../../../services/folder-service";
import { fetch_fileUpdate } from "../../../../../../services/file-service";
import type { SelectedItemType } from "../../FolderTable";

function RenameItemDialog({
  renameDialogRef,
  selectedItem,
}: {
  renameDialogRef: React.RefObject<HTMLDialogElement | null>;
  selectedItem: SelectedItemType;
}) {
  const [loading, setLoading] = useState(false);
  const { updateAppUI } = useApp();
  const [renameText, setRenameText] = useState("");
  const { appState } = useApp();

  const fetchedItem =
    selectedItem?.type === "folder"
      ? appState.allFolders.find((i) => i.id === selectedItem?.id)
      : appState.allFiles.find((i) => i.id === selectedItem?.id);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRenameText(fetchedItem?.name || "");
  }, [selectedItem, appState, fetchedItem, setRenameText]);

  const setValue = useCallback(
    (value: string) => {
      setRenameText(value);
    },
    [setRenameText],
  );

  const closeDialog = () => {
    const renameDialog = renameDialogRef.current;
    if (!renameDialog) return;
    renameDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    setLoading(true);
    const res =
      selectedItem.type === "folder"
        ? await fetch_folderUpdate({ id: selectedItem.id, name: renameText })
        : await fetch_fileUpdate({ id: selectedItem.id, name: renameText });
    setLoading(false);
    if (!res.ok) return console.log(res);
    await updateAppUI();
    closeDialog();
  };

  return (
    <dialog
      ref={renameDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Rename {selectedItem?.type === "folder" ? "Folder" : "File"}</h2>
        <TextField id="name" value={renameText} setValue={setValue} />
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
