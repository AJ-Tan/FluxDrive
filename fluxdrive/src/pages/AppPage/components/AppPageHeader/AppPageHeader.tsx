import { Link, useSearchParams } from "react-router";
import "./appPageHeader.css";
import ThreeDotsIcon from "../../../../assets/icons/three-dots-horizontal.svg?react";
import FolderIcon from "../../../../assets/icons/folder.svg?react";
import { useEffect, useRef, useState } from "react";
import type { FolderPathType } from "../../../../types/folder-types";
import useAuth from "../../../../context/AuthContext/useAuth";

function AppPageHeader({
  folderPath,
  baseLink = "/app/folders",
}: {
  folderPath: FolderPathType[];
  baseLink?: string;
}) {
  const [displayPopup, setDisplayPopup] = useState(false);
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const baseFolderId = user && `${user.id}-1`;

  useEffect(() => {
    const handleEvent = (e: PointerEvent) => {
      const container = containerRef.current;

      if (!container) return;
      if (!(e.target instanceof HTMLElement)) return;

      if (!container.contains(e.target)) {
        setDisplayPopup(false);
      }
    };

    document.addEventListener("click", handleEvent);
    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, []);

  const searchValue = searchParams.get("search");

  return (
    <header className="app-page-header">
      {searchValue ? (
        <span>Search Result:</span>
      ) : (
        <nav className="app-folder-nav">
          <ul>
            {folderPath && folderPath?.length > 3 && (
              <li>
                <button
                  ref={containerRef}
                  className="dot-container"
                  onClick={() => setDisplayPopup(true)}
                  aria-label="Open folder nav pop up."
                  aria-haspopup="menu"
                  aria-expanded={displayPopup}
                >
                  <ThreeDotsIcon />
                </button>
                <div
                  role="menu"
                  className={`popup-controls${displayPopup ? " show" : ""}`}
                >
                  {folderPath &&
                    folderPath.slice(0, -2).map((item) => (
                      <Link
                        key={item.id}
                        to={
                          item.id === baseFolderId
                            ? "/app"
                            : `${baseLink}/${item.id}`
                        }
                        className="popup-control-item"
                        role="menuitem"
                      >
                        <div className="icon-container">
                          <FolderIcon />
                        </div>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                </div>
              </li>
            )}
            {(folderPath && folderPath.length < 4
              ? folderPath
              : folderPath?.slice(-2)
            )?.map((item) => (
              <li key={item.id}>
                <Link
                  to={
                    item.id === baseFolderId ? "/app" : `${baseLink}/${item.id}`
                  }
                  className="link-folder-nav"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default AppPageHeader;
