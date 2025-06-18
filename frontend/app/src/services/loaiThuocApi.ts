import axiosClient from "../config/axios";
import type { LoaiThuocType } from "../types/loaiThuoc";

export const fetchLoaiThuoc = async ():Promise<LoaiThuocType[]> => {
    try {
        const res = await axiosClient.get<APIResponse<LoaiThuocType[]>>("medicine-type/");
        if (!res.data.success) throw new Error(res.data.message);
        return res.data.data || [];
    } catch (error) {
        console.error("Lỗi khi lấy danh sách loại thuốc:", error);
        throw error;
    }
};