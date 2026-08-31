import { useEffect, useState } from "react";
import type { SelectedItemType } from "../../FolderTable";
import "./shareLinkDialog.css";
import useApp from "../../../../../../context/AppContext/useApp";
import { fetch_generateFolderShare } from "../../../../../../services/share-service";

function ShareLinkDialog({
  shareLinkDialogRef,
  selectedItem,
}: {
  shareLinkDialogRef: React.RefObject<HTMLDialogElement | null>;
  selectedItem: SelectedItemType;
}) {
  const [loading, setLoading] = useState(false);
  const [folderLink, setFolderLink] = useState("");
  const [expireOption, setExpireOptions] = useState("1");
  const { appState, updateAppUI } = useApp();

  const folder = appState.allFolders.find((i) => i.id === selectedItem?.id);
  const folderShareExpiration =
    folder &&
    folder.folderShare?.length > 0 &&
    new Date(folder.folderShare[0].expiresAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!folder || folder?.folderShare?.length <= 0) return setFolderLink("");
    const sharedFolderExpiration = new Date(folder?.folderShare[0].expiresAt);
    if (new Date() > sharedFolderExpiration) return setFolderLink("");
    const shareId = folder?.folderShare.at(-1)?.id;

    setFolderLink(
      `${window.origin}${import.meta.env.BASE_URL}#/share/${shareId}`,
    );
  }, [selectedItem, appState, folder, setFolderLink]);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(folderLink)
      .then(() => alert("Link copied to clipboard."))
      .catch(() => alert("Something went wrong when copying the link."));
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setExpireOptions(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;

    let linkExpiration = 0;

    switch (expireOption) {
      case "1":
        linkExpiration = 1000 * 60 * 60 * 24 * 3;
        break;
      case "2":
        linkExpiration = 1000 * 60 * 60 * 24 * 7;
        break;
      case "3":
        linkExpiration = 1000 * 60 * 60 * 24 * 10;
        break;
    }

    setLoading(true);
    const res = await fetch_generateFolderShare(
      selectedItem.id,
      linkExpiration,
    );
    setLoading(false);
    if (!res.ok) return console.log(res);
    await updateAppUI();
  };

  const closeDialog = () => {
    const shareLinkDialog = shareLinkDialogRef.current;
    if (!shareLinkDialog) return;
    shareLinkDialog.close();
  };

  return (
    <dialog
      ref={shareLinkDialogRef}
      className={`dialog-form${loading ? " loading" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <h2>Share {selectedItem?.type === "folder" ? "Folder" : "File"}</h2>

        <div className="share-link-details">
          <div className="share-link-details-group">
            <div className="input-group">
              <input
                type="text"
                name="folderShare"
                className="txt-share"
                disabled
                value={folderLink}
                placeholder="Click generate to proceed."
              />
              {folder && folder.folderShare?.length > 0 && (
                <p className="txt-expiration">
                  Expiration Date: {folderShareExpiration}
                </p>
              )}
            </div>
            <button type="button" onClick={handleCopy}>
              Copy
            </button>
          </div>
          <div className="input-details-group">
            <label htmlFor="">Expiration:</label>
            <select
              name="expiresAt"
              value={expireOption}
              onChange={handleOptionChange}
            >
              <option value="1">3 days</option>
              <option value="2">7 days</option>
              <option value="3">10 days</option>
            </select>
          </div>
        </div>
        <div className="form-controls">
          <button type="button" onClick={closeDialog}>
            Cancel
          </button>
          <button type="submit">Generate</button>
        </div>
      </form>
    </dialog>
  );
}

export default ShareLinkDialog;
