import { useContext } from "react";
import { ShareContext } from "./ShareContext";

function useShare() {
  const context = useContext(ShareContext);

  if (!context) throw Error("useShare was used outside of its context.");
  return context;
}

export default useShare;
