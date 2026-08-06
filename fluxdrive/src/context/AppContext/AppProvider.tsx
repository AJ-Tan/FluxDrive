import { useEffect, useReducer, useState, type JSX } from "react";
import { AppContext } from "./AppContext";
import { folderAll } from "../../services/folder-service";
import useAuth from "../AuthContext/useAuth";
import { appInitialState, appReducer } from "./reducers/appReducer";
import { useParams } from "react-router";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

type ErrorType = {
  status: number;
  title: string;
  description: string;
} | null;

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, dispatchAppState] = useReducer(appReducer, appInitialState);
  const [error, setError] = useState<ErrorType>(null);
  const { user } = useAuth();
  const { folderid } = useParams();

  useEffect(() => {
    folderAll().then((res) => {
      if (!res.ok) return console.log(res);
      dispatchAppState({
        type: "updateData",
        payload: { folderId: `${user?.id}-1`, ...res.data },
      });

      // Check if folderid exists;
      const activeFolderId = folderid ? folderid : `${user?.id}-1`;
      const isFolderExists = res.data.allFolders.find(
        (i) => i.id === activeFolderId,
      );
      console.log(isFolderExists);
      if (!isFolderExists) {
        setError({
          status: 404,
          title: "That's an error.",
          description: "The requested URL was not found on this server.",
        });
      } else {
        setError(null);
      }
    });
  }, [user, dispatchAppState, setError, folderid]);

  return (
    <AppContext
      value={{
        appState,
        dispatchAppState,
      }}
    >
      {!error ? children : <ErrorPage {...error} />}
    </AppContext>
  );
}

export default AppProvider;
