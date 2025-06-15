import type { HangSXType } from "./hangSX";
import type { LoaiThuocType } from "./loaiThuoc";
import type { NhaCungCapType } from "./nhaCungCap";

export interface ThuocType {
    MaThuoc:       string;
    Loai:          LoaiThuocType;
    HangSX:        HangSXType;
    NhaCungCap:    NhaCungCapType;
    TenThuoc:      string;
    CongDung?:     string;
    DonGia:        number;
    SoLuongTonKho: number;
    HanSuDung:     Date | null;
}

export interface ThuocFormType {
    MaLoai:        string;
    MaHangSX:      string;
    MaNCC:         string;
    TenThuoc:      string;
    CongDung:      string;
    DonGia:        number;
    SoLuongTonKho: number;
    HanSuDung:     Date | null | string;
}