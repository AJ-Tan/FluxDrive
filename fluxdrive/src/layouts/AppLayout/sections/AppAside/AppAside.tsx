import "./appAside.css";
import useApp from "../../../../context/AppContext/useApp";
import FolderItem from "./components/FolderItem/FolderItem";
import ButtonNew from "./components/ButtonNew/ButtonNew";

function AppAside() {
  const { appState } = useApp();
  return (
    <aside className="app-aside">
      <ButtonNew />
      <FolderItem key={`root`} folder={appState.folderStructure} index={1} />
    </aside>
  );
}

export default AppAside;
