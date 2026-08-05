export type UploadStatusListType = {
  id: string;
  name: string;
  url: string | null;
  isComplete: boolean;
}[];

export type UploadStatusActionType =
  | { type: "add"; payload: { id: string; file: File }[] }
  | { type: "setComplete"; payload: { id: string; url: string } }
  | { type: "clear" };

type UploadStatusReducerType = (
  state: UploadStatusListType,
  action: UploadStatusActionType,
) => UploadStatusListType;

const uploadStatusReducer: UploadStatusReducerType = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...action.payload.map((item) => ({
          id: item.id,
          name: item.file.name,
          url: null,
          isComplete: false,
        })),
        ...state,
      ];
    case "setComplete":
      return [...state].map((i) =>
        i.id === action.payload.id
          ? { ...i, url: action.payload.url, isComplete: true }
          : i,
      );
    case "clear":
      return [];
    default:
      return [...state];
  }
};

export { uploadStatusReducer };
