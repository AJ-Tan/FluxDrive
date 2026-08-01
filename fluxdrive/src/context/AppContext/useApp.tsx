import { useContext } from "react";
import { AppContext } from "./AppContext";

function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp has been used outside of its context.");
  return context;
}

export default useApp;
