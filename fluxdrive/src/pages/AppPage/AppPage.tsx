import useApp from "../../context/AppContext/useApp";
import "./appPage.css";
import { useParams } from "react-router";
import AppPageHeader from "./components/AppPageHeader/AppPageHeader";
import FolderTable from "./components/FolderTable/FolderTable";
import { useEffect } from "react";

function AppPage() {
  const { appState, dispatchAppState, allContentItem } = useApp();
  const { folderid } = useParams();

  useEffect(() => {
    dispatchAppState({ type: "setSearch", payload: "" });
  }, [folderid, dispatchAppState]);

  return (
    <>
      <main className="app-page">
        <div className="app-page-container">
          <AppPageHeader folderPath={appState.folderPath} />
          <div className="app-content">
            <FolderTable tableData={allContentItem()} />
          </div>
        </div>
      </main>
    </>
  );
}

export default AppPage;
