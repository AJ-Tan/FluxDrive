import AppLayout from "../../layouts/AppLayout/AppLayout";
import FileDetails from "./sections/FileDetails/FileDetails";
import "./appPage.css";

function AppPage() {
  return (
    <AppLayout>
      <main className="app-page">
        <div className="content">Test</div>
      </main>
      <FileDetails />
    </AppLayout>
  );
}

export default AppPage;
