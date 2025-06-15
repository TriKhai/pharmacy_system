import axiosClient from "../config/axios";
import type { ThuocFormType, ThuocType } from "../types/thuoc";

export const fetchThuocs = async ():Promise<ThuocType[]> => {
    try {
        const res = await axiosClient.get<ThuocType []>('medicine'); 
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const createThuoc = async (form: ThuocFormType):Promise<ThuocType> => {
    try {
        const res = await axiosClient.post<ThuocType>('medicine/', form);
        console.log("Response trả về: ", res.data)
        return res.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

export const updateThuoc = async (
  MaThuoc: string,
  form: ThuocFormType
): Promise<ThuocType> => {
  try {
    const res = await axiosClient.put<ThuocType>(`medicine/${MaThuoc}/`, form);
    // console.log("Response trả về: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const deleteThuoc = async (MaThuoc: string):Promise<string> => {
    try {
        const res = await axiosClient.delete<string>(`medicine/${MaThuoc}/`);
        // console.log("Response trả về: ", res);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
}