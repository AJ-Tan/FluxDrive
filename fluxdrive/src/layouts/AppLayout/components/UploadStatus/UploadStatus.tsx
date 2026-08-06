import MyFileIcon from "../../../../components/MyFileIcon/MyFileIcon";
import "./uploadStatus.css";
import loadingIcon from "../../../../assets/icons/loading.gif";
import checkIcon from "../../../../assets/icons/check.png";
import { useState } from "react";
import ButtonClose from "../../../../components/Buttons/ButtonClose/ButtonClose";
import useUpload from "../../../../context/UploadContext/useUpload";

function UploadStatus() {
  const [hide, setHide] = useState(false);
  const { uploadState, dispatchUploadState } = useUpload();

  const pendingFile = uploadState.filter((i) => !i.isComplete).length;

  const handleClose = () => {
    dispatchUploadState({ type: "clear" });
    setHide(false);
  };

  const toggleHide = () => {
    setHide((prev) => !prev);
  };

  const navigateUrl = (url: string | null) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    uploadState.length > 0 && (
      <div className={`upload-status${hide ? " hide" : ""}`}>
        <header className="header">
          <span>
            {pendingFile
              ? `Uploading ${pendingFile} files`
              : `${uploadState.length} uploads complete`}
          </span>
          <div className="controls">
            <button
              type="button"
              onClick={toggleHide}
              className="btn-toggle-visibility"
              aria-label="Toggle upload status visibility"
            ></button>
            <ButtonClose handleClose={handleClose} />
          </div>
        </header>
        <ul className="upload-list">
          {uploadState.map((item) => (
            <li
              key={item.id}
              className={`upload-item ${item.isComplete ? "complete" : "uploading"}`}
              onClick={() => navigateUrl(item.url)}
            >
              <div className="file-item-details">
                <div className="icon-file">
                  <MyFileIcon fileName={item.name} />
                </div>
                <span>{item.name}</span>
              </div>{" "}
              <div className="icon-status">
                <img src={item.isComplete ? checkIcon : loadingIcon} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default UploadStatus;
