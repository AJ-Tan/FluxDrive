import { createContext } from "react";
import type {
  UploadStatusActionType,
  UploadStatusListType,
} from "./reducer/uploadStatusReducerType";

type UploadStatusContextType = {
  uploadState: UploadStatusListType[];
  dispatchUploadState: React.ActionDispatch<[action: UploadStatusActionType]>;
};

export const UploadStatusContext =
  createContext<UploadStatusContextType | null>(null);
