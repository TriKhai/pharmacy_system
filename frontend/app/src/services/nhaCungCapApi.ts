import axiosClient from "../config/axios";
import type { NhaCungCapType } from "../types/nhaCungCap";

export const fetchNCC = async ():Promise<NhaCungCapType[]> => {
    try {
        const res = await axiosClient.get<NhaCungCapType []>('supplier'); 
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}
