import MyFileIcon from "../../../../components/MyFileIcon/MyFileIcon";
import "./uploadStatus.css";
import loadingIcon from "../../../../assets/icons/loading.gif";
import checkIcon from "../../../../assets/icons/check.png";
import { useState } from "react";
import ButtonClose from "../../../../components/Buttons/ButtonClose/ButtonClose";
import useUpload from "../../../../context/UploadContext/useUpload";
import FolderIcon from "../../../../assets/icons/folder.svg?react";
import type { UploadStatusListType } from "../../../../context/UploadContext/reducer/uploadStatusReducerType";
import { useNavigate } from "react-router";

function UploadStatus() {
  const [hide, setHide] = useState(false);
  const { uploadState, dispatchUploadState } = useUpload();
  const navigate = useNavigate();

  const pendingFile = uploadState.filter((i) => !i.isComplete).length;

  const handleClose = () => {
    dispatchUploadState({ type: "clear" });
    setHide(false);
  };

  const toggleHide = () => {
    setHide((prev) => !prev);
  };

  const handleOnClick = (item: UploadStatusListType) => {
    if (!item.url) return;
    if (item.type === "file") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/app/folders/${item.url}`);
    }
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
            <ButtonClose
              handleClose={handleClose}
              aria-label="Close upload status."
            />
          </div>
        </header>
        <ul className="upload-list">
          {uploadState.map((item) => (
            <li key={item.id}>
              <button
                key={item.id}
                type="button"
                className={`upload-item ${item.isComplete ? "complete" : "uploading"}`}
                onClick={() => handleOnClick(item)}
              >
                <div className="file-item-details">
                  <div className="icon-file">
                    {item.type === "file" ? (
                      <MyFileIcon fileName={item.name} />
                    ) : (
                      <div className="icon-container">
                        <FolderIcon />
                      </div>
                    )}
                  </div>
                  <span>{item.name}</span>
                </div>{" "}
                <div className="icon-status">
                  <img src={item.isComplete ? checkIcon : loadingIcon} alt="" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default UploadStatus;
