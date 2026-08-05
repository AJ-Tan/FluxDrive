import AppLayout from "../../layouts/AppLayout/AppLayout";
import "./appPage.css";
import ItemDetails from "./sections/ItemDetails/ItemDetails";

function AppPage() {
  return (
    <AppLayout>
      <main className="app-page">
        <div className="content">Test</div>
      </main>
      <ItemDetails />
    </AppLayout>
  );
}

export default AppPage;
