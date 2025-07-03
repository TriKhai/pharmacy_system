export type Column = {
  key: string;
  label: string;
};

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export function formatCurrency(value: number): string {
  return Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

