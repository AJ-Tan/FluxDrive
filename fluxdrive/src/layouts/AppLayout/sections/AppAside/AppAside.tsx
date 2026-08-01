import "./appAside.css";
import useApp from "../../../../context/AppContext/useApp";
import FolderItem from "./components/FolderItem/FolderItem";

function AppAside() {
  const {
    asideFolders: [asideFolder],
  } = useApp();

  return (
    <aside className="app-aside">
      <FolderItem key={`root`} folder={asideFolder} index={1} />
    </aside>
  );
}

export default AppAside;
