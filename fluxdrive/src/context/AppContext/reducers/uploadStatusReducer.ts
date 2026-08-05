export type UploadStatusListType = {
  id: string;
  name: string;
  isComplete: boolean;
}[];

export type UploadStatusActionType =
  | { type: "add"; payload: { id: string; file: File }[] }
  | { type: "setComplete"; payload: string }
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
          isComplete: false,
        })),
        ...state,
      ];
    case "setComplete":
      return [...state].map((i) =>
        i.id === action.payload ? { ...i, isComplete: true } : i,
      );
    case "clear":
      return [];
    default:
      return [...state];
  }
};

export { uploadStatusReducer };
