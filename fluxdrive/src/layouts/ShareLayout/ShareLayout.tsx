import { Outlet } from "react-router";
import ShareProvider from "../../context/ShareContext/ShareProvider";

function ShareLayout() {
  return (
    <ShareProvider>
      <div className="share-layout">
        <Outlet />
      </div>
    </ShareProvider>
  );
}

export default ShareLayout;
