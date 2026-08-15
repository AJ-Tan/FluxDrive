import { useParams } from "react-router";
import useShare from "../../context/ShareContext/useShare";
import AppPageHeader from "../AppPage/components/AppPageHeader/AppPageHeader";
import SharePageTable from "./components/Table/SharePageTable";

function SharePage() {
  const { activeFolderContent, activeFolderNav } = useShare();
  const { shareid } = useParams();

  return (
    <main className="share-page">
      <div className="share-page-container">
        <div>
          <AppPageHeader
            folderNav={activeFolderNav}
            baseLink={`/shared/${shareid}`}
          />
        </div>
        <div className="share-content">
          {activeFolderContent.length > 0 && (
            <SharePageTable tableData={activeFolderContent} />
          )}
        </div>
      </div>
    </main>
  );
}

export default SharePage;
