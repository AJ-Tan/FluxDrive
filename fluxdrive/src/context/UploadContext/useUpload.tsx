import { useContext } from "react";
import { UploadStatusContext } from "./UploadContext";

function useUpload() {
  const context = useContext(UploadStatusContext);

  if (!context)
    throw new Error("useUpload has been used outside of its context");

  return context;
}

export default useUpload;
