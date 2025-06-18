import axiosClient from "../config/axios";
import type { NhaCungCapType } from "../types/nhaCungCap";

export const fetchNCC = async ():Promise<NhaCungCapType[]> => {
    try {
        const res = await axiosClient.get<APIResponse<NhaCungCapType[]>>("supplier/");
        if (!res.data.success) throw new Error(res.data.message);
        return res.data.data || [];
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
        throw error;
    }
};
