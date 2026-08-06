import { useEffect, useReducer, type JSX } from "react";
import { AppContext } from "./AppContext";
import { folderAll } from "../../services/folder-service";
import useAuth from "../AuthContext/useAuth";
import { appInitialState, appReducer } from "./reducers/appReducer";

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, dispatchAppState] = useReducer(appReducer, appInitialState);
  const { user } = useAuth();

  useEffect(() => {
    folderAll().then((res) => {
      if (!res.ok) return console.log(res);
      dispatchAppState({
        type: "updateData",
        payload: { folderId: `${user?.id}-1`, ...res.data },
      });
    });
  }, [user, dispatchAppState]);

  return (
    <AppContext
      value={{
        appState,
        dispatchAppState,
      }}
    >
      {children}
    </AppContext>
  );
}

export default AppProvider;
