export type Column = {
  key: string;
  label: string;
};

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};