import type { UploadStatusReducerType } from "./uploadStatusReducerType";

const uploadStatusReducer: UploadStatusReducerType = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        {
          id: action.payload.id,
          name: action.payload.name,
          type: action.payload.type,
          url: null,
          isComplete: false,
        },
        ...state,
      ];
    case "remove":
      return [...state].filter((i) => i.id !== action.payload);
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
