import { useReducer, type JSX } from "react";
import { uploadStatusReducer } from "../UploadContext/reducer/uploadStatusReducer";
import { UploadStatusContext } from "./UploadContext";

function UploadProvider({ children }: { children: JSX.Element }) {
  const [uploadState, dispatchUploadState] = useReducer(
    uploadStatusReducer,
    [],
  );

  return (
    <UploadStatusContext
      value={{
        uploadState,
        dispatchUploadState,
      }}
    >
      {children}
    </UploadStatusContext>
  );
}

export default UploadProvider;
