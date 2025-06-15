import axiosClient from "../config/axios";
import type { LoaiThuocType } from "../types/loaiThuoc";

export const fetchLoaiThuoc = async ():Promise<LoaiThuocType[]> => {
    try {
        const res = await axiosClient.get<LoaiThuocType []>('medicine-type'); 
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}
