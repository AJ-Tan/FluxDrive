import { useCallback, useEffect, useState } from "react";
import TextField from "../../../../components/Inputs/Textfield/TextField";
import { folderAdd } from "../../../../services/folder-service";
import useApp from "../../../../context/AppContext/useApp";
import { useParams } from "react-router";
import useAuth from "../../../../context/AuthContext/useAuth";

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
    <AddFolderForm
      input={formInput.values.input}
      setValue={setValue}
      ref={ref}
    />
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
  const [loading, setLoading] = useState(false);
  const { dispatchAppState } = useApp();
  const { folderid } = useParams();
  const { user } = useAuth();

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
    const activeFolder = folderid || `${user?.id}-1`;
    if (!activeFolder) return;
    setLoading(true);
    const res = await folderAdd(input, activeFolder);
    setLoading(false);
    if (!res.ok) return console.log(res);
    closeDialog();
    setValue("input", "Untitled Folder");
    dispatchAppState({
      type: "updateData",
      payload: { allFolders: res.data.allFolders, allFiles: res.data.allFiles },
    });
  };

  return (
    <dialog ref={ref} className={`dialog-form${loading ? " loading" : ""}`}>
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
    </dialog>
  );
}

export default FolderDialog;
