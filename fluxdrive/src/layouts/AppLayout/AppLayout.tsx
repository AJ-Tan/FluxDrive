import type { JSX } from "react/jsx-runtime";
import "./appLayout.css";
import AppHeader from "./sections/AppHeader/AppHeader";
import AppAside from "./sections/AppAside/AppAside";

function AppLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="app-layout">
      <AppHeader />
      <AppAside />
      {children}
    </div>
  );
}

export default AppLayout;
