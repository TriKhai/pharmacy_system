import type { ThuocType } from "./thuoc";
import type { KhachHangType } from "./khachHang"
export interface HoaDonType {
    MaHoaDon: string;
    MaKH?: KhachHangType;
    NgayLap: string; // định dạng yyyy-mm-dd
    TongTien: number;
    ChiTiet?: ChiTietHoaDonType[]; // optional nếu bạn cần nested
}

export interface HoaDonFormType {
    MaKH: string;
    NgayLap: string; // yyyy-mm-dd
}

export interface ChiTietHoaDonType {
    MaChiTietHD: string;
    MaThuoc: string;
    SoLuongBan: number;
    GiaBan: number;
    Thuoc?: ThuocType; // nếu có nested thuốc
}
