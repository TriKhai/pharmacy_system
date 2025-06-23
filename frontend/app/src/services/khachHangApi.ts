import axiosClient from "../config/axios";
import type { KhachHangFormType, KhachHangType } from "../types/khachHang";
import type { APIResponse } from "../types/utils";

export const fetchKhachHangs = async (): Promise<KhachHangType[]> => {
  try {
    const res = await axiosClient.get<APIResponse<KhachHangType[]>>("user/");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    throw error;
  }
};

export const createKhachHang = async (
  form: KhachHangFormType
): Promise<KhachHangType> => {
  try {
    const res = await axiosClient.post<APIResponse<KhachHangType>>("user/", {
      data: form,
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data!;
  } catch (error) {
    console.error("Lỗi khi tạo khách hàng:", error);
    throw error;
  }
};

export const updateKhachHang = async (
  MaKhachHang: string,
  form: KhachHangFormType
): Promise<KhachHangType> => {
  try {
    const res = await axiosClient.put<APIResponse<KhachHangType>>(
      `user/${MaKhachHang}/`,
      { data: form }
    );
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data!;
  } catch (error) {
    console.error("Lỗi khi cập nhật khách hàng:", error);
    throw error;
  }
};

export const deleteKhachHang = async (MaKhachHang: string): Promise<string> => {
  try {
    const res = await axiosClient.delete<APIResponse<null>>(
      `user/${MaKhachHang}/`
    );
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    throw error;
  }
};
