import type { JSX } from "react/jsx-runtime";
import "./appLayout.css";
import AppHeader from "./sections/AppHeader/AppHeader";
import AppAside from "./sections/AppAside/AppAside";
import AppProvider from "../../context/AppContext/AppProvider";
import UploadStatus from "./components/UploadStatus/UploadStatus";

function AppLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <AppProvider>
      <div className="app-layout">
        <AppHeader />
        <AppAside />
        {children}
        <UploadStatus />
      </div>
    </AppProvider>
  );
}

export default AppLayout;
