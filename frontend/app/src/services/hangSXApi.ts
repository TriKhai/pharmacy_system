import axiosClient from "../config/axios";
import type { HangSXFormType, HangSXType } from "../types/HangSX";

export const fetchHangSXs = async ():Promise<HangSXType[]> => {
    try {
        const res = await axiosClient.get<HangSXType []>('manufacturer/'); 
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const createHangSX = async (form: HangSXFormType):Promise<HangSXType> => {
    try {
        const res = await axiosClient.post<HangSXType>('manufacturer/', form);
        console.log("Response trả về: ", res.data)
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const updateHangSX = async (
  MaHangSX: string,
  form: HangSXFormType
): Promise<HangSXType> => {
  try {
    const res = await axiosClient.put<HangSXType>(`manufacturer/${MaHangSX}/`, form);
    // console.log("Response trả về: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const deleteHangSX = async (MaHangSX: string):Promise<string> => {
    try {
        const res = await axiosClient.delete<string>(`manufacturer/${MaHangSX}/`);
        // console.log("Response trả về: ", res);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
}