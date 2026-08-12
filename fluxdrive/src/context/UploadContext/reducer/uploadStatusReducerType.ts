export type UploadStatusListType = {
  id: string;
  name: string;
  url: string | null;
  isComplete: boolean;
}[];

export type UploadStatusActionType =
  | { type: "add"; payload: { id: string; file: File }[] }
  | { type: "setComplete"; payload: { id: string; url: string } }
  | { type: "remove"; payload: string }
  | { type: "clear" };

export type UploadStatusReducerType = (
  state: UploadStatusListType,
  action: UploadStatusActionType,
) => UploadStatusListType;
