export type ApiResponse<T> = {
  headerResponse: {
    code: number;
    message: string;
  };
  payload: T;
};
