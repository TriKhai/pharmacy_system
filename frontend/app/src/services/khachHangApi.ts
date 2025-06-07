import axiosClient from "../config/axios";
import type { KhachHangFormType, KhachHangType } from "../types/khachHang";

export const fetchKhachHangs = async ():Promise<KhachHangType[]> => {
    try {
        const res = await axiosClient.get<KhachHangType []>('user'); 
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const createKhachHang = async (form: KhachHangFormType):Promise<KhachHangType> => {
    try {
        const res = await axiosClient.post<KhachHangType>('user/', form);
        console.log("Response trả về: ", res.data)
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const updateKhachHang = async (
  MaKhachHang: string,
  form: KhachHangFormType
): Promise<KhachHangType> => {
  try {
    const res = await axiosClient.put<KhachHangType>(`user/${MaKhachHang}/`, form);
    // console.log("Response trả về: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const deleteKhachHang = async (MaKhachHang: string):Promise<string> => {
    try {
        const res = await axiosClient.delete<string>(`user/${MaKhachHang}/`);
        // console.log("Response trả về: ", res);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
}