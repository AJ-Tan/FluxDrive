type BaseResponse = {
  ok: boolean;
  name: string;
  message: string;
  data: Record<string, string>;
};

type ErrorResponse = {
  errDetails: Record<string, string> & {
    validationError: Record<string, string[]>;
  };
};

export type ResponseType = BaseResponse & ErrorResponse;
