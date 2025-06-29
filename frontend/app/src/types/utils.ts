export type Column = {
  key: string;
  label: string;
};

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
