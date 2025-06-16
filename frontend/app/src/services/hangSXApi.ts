import axiosClient from "../config/axios";
import type { HangSXFormType, HangSXType } from "../types/HangSX";

type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export const fetchHangSXs = async (): Promise<HangSXType[]> => {
  try {
    const res = await axiosClient.get<APIResponse<HangSXType[]>>("manufacturer/");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hãng sản xuất:", error);
    throw error;
  }
};

export const createHangSX = async (form: HangSXFormType): Promise<HangSXType> => {
  try {
    const res = await axiosClient.post<APIResponse<HangSXType>>("manufacturer/", {
      data: form,
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data!;
  } catch (error) {
    console.error("Lỗi khi tạo hãng sản xuất:", error);
    throw error;
  }
};

export const updateHangSX = async (
  MaHangSX: string,
  form: HangSXFormType
): Promise<HangSXType> => {
  try {
    const res = await axiosClient.put<APIResponse<HangSXType>>(`manufacturer/${MaHangSX}/`, {
      data: form,
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data!;
  } catch (error) {
    console.error("Lỗi khi cập nhật hãng sản xuất:", error);
    throw error;
  }
};

export const deleteHangSX = async (MaHangSX: string): Promise<string> => {
  try {
    const res = await axiosClient.delete<APIResponse<null>>(`manufacturer/${MaHangSX}/`);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("Lỗi khi xóa hãng sản xuất:", error);
    throw error;
  }
};
