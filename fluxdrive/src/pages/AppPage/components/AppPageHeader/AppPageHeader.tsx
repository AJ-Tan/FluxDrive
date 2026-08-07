import { Link } from "react-router";
import type { FolderType } from "../../../../types/folder-types";
import "./appPageHeader.css";

function AppPageHeader({ folderNav }: { folderNav: FolderType[] | undefined }) {
  return (
    <header className="app-page-header">
      <nav className="app-folder-nav">
        <ul>
          {folderNav?.map((folder) => (
            <li key={folder.id}>
              <Link to={`/app/folders/${folder.id}`}>{folder.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppPageHeader;
