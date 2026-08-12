import { Link } from "react-router";
import type { FolderType } from "../../../../types/folder-types";
import "./appPageHeader.css";
import ThreeDotsIcon from "../../../../assets/icons/three-dots-horizontal.svg?react";
import FolderIcon from "../../../../assets/icons/folder.svg?react";
import { useEffect, useRef, useState } from "react";
import useApp from "../../../../context/AppContext/useApp";

function AppPageHeader({ folderNav }: { folderNav: FolderType[] | undefined }) {
  const [displayPopup, setDisplayPopup] = useState(false);
  const { appState } = useApp();
  const containerRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <header className="app-page-header">
      {appState.searchText ? (
        <span>Search results</span>
      ) : (
        <nav className="app-folder-nav">
          <ul>
            {folderNav && folderNav?.length > 3 && (
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
                  {folderNav &&
                    folderNav.slice(0, -2).map((item) => (
                      <Link
                        key={item.id}
                        to={`/app/folders/${item.id}`}
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
            {(folderNav && folderNav.length < 4
              ? folderNav
              : folderNav?.slice(-2)
            )?.map((folder) => (
              <li key={folder.id}>
                <Link
                  to={`/app/folders/${folder.id}`}
                  className="link-folder-nav"
                >
                  {folder.name}
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
