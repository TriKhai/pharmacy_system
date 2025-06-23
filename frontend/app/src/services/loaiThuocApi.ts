import axiosClient from "../config/axios";
import type { LoaiThuocType, LoaiThuocFormType } from "../types/loaiThuoc";
import type { APIResponse } from "../types/utils";

export const fetchLoaiThuocs = async ():Promise<LoaiThuocType[]> => {
    try {
        const res = await axiosClient.get<APIResponse<LoaiThuocType[]>>("medicine-type/");
        if (!res.data.success) throw new Error(res.data.message);
        return res.data.data || [];
    } catch (error) {
        console.error("Lỗi khi lấy danh sách loại thuốc:", error);
        throw error;
    }
};

export const createLoaiThuoc = async (
    form: LoaiThuocFormType
  ): Promise<LoaiThuocType> => {
    try {
      const res = await axiosClient.post<APIResponse<LoaiThuocType>>("medicine-type/", {
        data: form,
      });
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data!;
    } catch (error) {
      console.error("Lỗi khi tạo loại thuốc:", error);
      throw error;
    }
  };
  
  export const updateLoaiThuoc = async (
    MaLoai: string,
    form: LoaiThuocFormType
  ): Promise<LoaiThuocType> => {
    try {
      const res = await axiosClient.put<APIResponse<LoaiThuocType>>(
        `medicine-type/${MaLoai}/`,
        { data: form }
      );
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.data!;
    } catch (error) {
      console.error("Lỗi khi cập nhật loại thuốc:", error);
      throw error;
    }
  };
  
  export const deleteLoaiThuoc = async (MaLoai: string): Promise<string> => {
    try {
      const res = await axiosClient.delete<APIResponse<null>>(
        `medicine-type/${MaLoai}/`
      );
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.message;
    } catch (error) {
      console.error("Lỗi khi xóa loại thuốc:", error);
      throw error;
    }
  };
  