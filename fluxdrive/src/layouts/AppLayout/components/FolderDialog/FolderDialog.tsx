import { useCallback, useEffect, useState } from "react";
import TextField from "../../../../components/Inputs/Textfield/TextField";
import { folderAdd } from "../../../../services/folder-service";
import useApp from "../../../../context/AppContext/useApp";

type InitialStateType = {
  values: {
    input: string;
  };
};

const initialState = {
  values: {
    input: "",
  },
};

function FolderDialog({
  ref,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
}) {
  const [formInput, setFormInput] = useState<InitialStateType>(initialState);

  const setValue = useCallback((id: string, value: string) => {
    setFormInput((prev) => ({
      ...prev,
      values: { ...prev.values, [id]: value },
    }));
  }, []);

  return (
    <dialog ref={ref} className="dialog-form">
      <AddFolderForm
        input={formInput.values.input}
        setValue={setValue}
        ref={ref}
      />
    </dialog>
  );
}

function AddFolderForm({
  input,
  setValue,
  ref,
}: {
  input: string;
  setValue: (id: string, value: string) => void;
  ref: React.RefObject<HTMLDialogElement | null>;
}) {
  const { appState, dispatch } = useApp();

  useEffect(() => {
    setValue("input", "Untitled Folder");
  }, [setValue]);

  const closeDialog = () => {
    const folderDialog = ref.current;
    if (!folderDialog) return;
    folderDialog.close();
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const activeFolder = appState.activeFolder;
    if (!activeFolder) return;
    const res = await folderAdd(input, activeFolder);
    if (!res.ok) return console.log(res);
    closeDialog();
    setValue("input", "Untitled Folder");
    dispatch({
      type: "updateData",
      payload: { allFolders: res.data.allFolders, allFiles: res.data.allFiles },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Folder</h2>
      <TextField id="input" value={input} setValue={setValue} />
      <div className="form-controls">
        <button type="button" onClick={closeDialog}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default FolderDialog;
