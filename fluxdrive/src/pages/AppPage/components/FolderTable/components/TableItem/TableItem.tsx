import { Link, useNavigate } from "react-router";
import useApp from "../../../../../../context/AppContext/useApp";
import type { SelectedItemType } from "../../FolderTable";
import {
  fileSizeText,
  formattedDate,
} from "../../../../../../utils/common-functions";
import MyFileIcon from "../../../../../../components/MyFileIcon/MyFileIcon";
import FileDownloadIcon from "../../../../../../assets/icons/file-download.svg?react";
import FolderIcon from "../../../../../../assets/icons/folder.svg?react";
import FolderShareIcon from "../../../../../../assets/icons/folder-share.svg?react";
import RenameIcon from "../../../../../../assets/icons/pen-line.svg?react";
import DeleteIcon from "../../../../../../assets/icons/delete.svg?react";
import ThreeDotsVertical from "../../../../../../assets/icons/three-dots-vertical.svg?react";
import "./tableItem.css";
import { useEffect, useRef, useState } from "react";
import type { AllContentItemType } from "../../../../../../context/AppContext/AppProvider";

type TableItemProps = {
  item: AllContentItemType;
  renameDialogRef: React.RefObject<HTMLDialogElement | null>;
  deleteDialogRef: React.RefObject<HTMLDialogElement | null>;
  shareLinkDialogRef: React.RefObject<HTMLDialogElement | null>;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItemType>>;
};

function TableItem({
  item,
  renameDialogRef,
  deleteDialogRef,
  shareLinkDialogRef,
  setSelectedItem,
}: TableItemProps) {
  const {
    appState: { focusedItem },
    dispatchAppState,
  } = useApp();
  const navigate = useNavigate();
  const [actionPopup, setActionPopup] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({
    top: "100%",
    transformOrigin: "top right",
  });
  const containerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleEvent = (e: PointerEvent) => {
      const container = containerRef.current;

      if (!container) return;
      if (!(e.target instanceof HTMLElement)) return;

      if (!container.contains(e.target)) {
        setActionPopup(false);
      }
    };

    document.addEventListener("click", handleEvent);
    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, []);

  const setFocusedItem = (id: string, itemType: "folder" | "file") => {
    dispatchAppState({ type: "focusedItem", payload: { id, itemType } });
    setSelectedItem({ id, type: itemType });
  };

  const openFolder = (id: string) => {
    navigate(`/app/folders/${id}`);
  };
  const openFile = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openPopupMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const elementTop = e.target.getBoundingClientRect().top;
    const windowHeightHalf = window.innerHeight / 2;

    if (elementTop > windowHeightHalf) {
      setPopupStyle({ top: "-250%", transformOrigin: "bottom right" });
    } else {
      setPopupStyle({
        top: "100%",
        transformOrigin: "top right",
      });
    }

    setActionPopup(true);
  };

  const openDialog = (type: "rename" | "delete" | "share") => {
    let dialog = null;

    switch (type) {
      case "rename":
        dialog = renameDialogRef.current;
        break;
      case "delete":
        dialog = deleteDialogRef.current;
        break;
      case "share":
        dialog = shareLinkDialogRef.current;
        break;
    }

    if (!dialog) return;
    dialog.showModal();
  };

  return (
    <tr
      key={item.id}
      className={`tbl-row${focusedItem?.id === item.id ? " focused" : ""}`}
      onClick={() => setFocusedItem(item.id, item.type)}
      onDoubleClick={() =>
        item.type === "file" ? openFile(item.fileUrl) : openFolder(item.id)
      }
    >
      <td>
        <div className="item-details">
          <div className="item-icon">
            {item.type === "file" ? (
              <MyFileIcon fileName={item.name} />
            ) : (
              <div className="icon-container">
                <FolderIcon />
              </div>
            )}
          </div>
          <span className="item-name">{item.name}</span>
        </div>
      </td>
      <td>
        <span>{formattedDate(item.createdAt)}</span>
      </td>
      <td>
        <span>{item.type === "file" ? fileSizeText(item.size) : "--"}</span>
      </td>
      <td>
        <div className="tbl-controls">
          <div className="action-list-container">
            <button
              ref={containerRef}
              type="button"
              className="btn-action-list icon-container"
              onClick={(e) => openPopupMenu(e)}
              aria-label="Open list of actions."
              aria-haspopup="menu"
              aria-expanded={actionPopup}
            >
              <ThreeDotsVertical />
            </button>
            <div
              role="menu"
              className={`popup-controls${actionPopup ? " show" : ""}`}
              style={popupStyle}
            >
              <button
                className="popup-control-item"
                role="menuitem"
                onClick={() => openDialog("rename")}
              >
                <div className="icon-container">
                  <RenameIcon />
                </div>
                Rename
              </button>
              <button
                className="popup-control-item"
                role="menuitem"
                onClick={() => openDialog("delete")}
              >
                <div className="icon-container">
                  <DeleteIcon />
                </div>
                Delete
              </button>
              {item.type === "folder" ? (
                <button
                  className="popup-control-item"
                  role="menuitem"
                  onClick={() => openDialog("share")}
                >
                  <div className="icon-container folder-share-icon">
                    <FolderShareIcon />
                  </div>
                  Share
                </button>
              ) : (
                <Link
                  className="popup-control-item"
                  to={item.fileUrl.replace(
                    "/upload/",
                    `/upload/fl_attachment:${item.name ? item.name.replace(/,/g, "").replace("-", "_").split(".").slice(0, -1).join("") : "file"}/`,
                  )}
                  target="_blank"
                  download={item.name}
                >
                  <div className="icon-container">
                    <FileDownloadIcon />
                  </div>
                  Download
                </Link>
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableItem;
