import React, { useEffect, useState } from "react";
import type { KhachHangType } from "../../types/khachHang";
import axiosClient from "../../config/axios";
import DataTable, { type Column } from "../../components/layout/DataTable";


const KhachHang: React.FC = () => {
    const [khachHangs, setKhachHangs] = useState<KhachHangType[]>([]);

    useEffect(() => {
      const fetchKhachHangs = async () => {
        try {
          const response = await axiosClient.get<KhachHangType[]>('khach-hang');
          setKhachHangs(response.data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };

      fetchKhachHangs();
    }, []);

    // (Dữ liệu tĩnh)
    // const khachHangs: KhachHangType[] = [
    //   {
    //     maKhachHang: 'KH001',
    //     tenKhachHang: 'Nguyễn Văn A',
    //     soDienThoai: '0901234567',
    //     diaChi: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    //   },
    //   {
    //     maKhachHang: 'KH002',
    //     tenKhachHang: 'Trần Thị B',
    //     soDienThoai: '0912345678',
    //     diaChi: '456 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
    //   },
    //   {
    //     maKhachHang: 'KH003',
    //     tenKhachHang: 'Lê Văn C',
    //     soDienThoai: '0987654321',
    //     diaChi: '',
    //   },
    // ];

    const columns: Column<KhachHangType>[] = [
      { key: 'maKhachHang', label: 'Mã Khách Hàng' },
      { key: 'tenKhachHang', label: 'Tên Khách Hàng' },
      { key: 'soDienThoai', label: 'Số Điện Thoại' },
      { key: 'diaChi', label: 'Địa Chỉ' },
    ];

    // CSS variable
    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<KhachHangType>
            data={khachHangs}
            columns={columns}
            title="Danh sách khách hàng"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin khách hàng</h3>

            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="maKhachHang" className="">Mã Khách Hàng:</label>
                <input id="maKhachHang" type="text" className="border px-2 py-1 w-full" />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="tenKhachHang" className="">Tên Khách Hàng:</label>
                <input id="tenKhachHang" type="text" className="border px-2 py-1 w-full" />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="soDienThoai" className="">Số Điện Thoại:</label>
                <input id="soDienThoai" type="text" className="border px-2 py-1 w-full" />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="diaChi" className="">Địa Chỉ:</label>
                <input id="diaChi" type="text" className="border px-2 py-1 w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass}>Thêm khách hàng</button>
              <button className={buttonClass}>Lưu</button>
              <button className={buttonClass}>Sửa</button>
              <button className={buttonClass}>Xóa</button>
              <button className={buttonClass}>Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Khách Hàng</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="maKhachHang" className="">Tên khách hàng:</label>
              <input id="maKhachHang" type="text" className="border px-2 py-1 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass}>Tìm kiếm</button>
              <button className={buttonClass}>Hủy tìm kiếm</button>
            </div>
          </div>
        </div>

      </div>
    );
}

export default KhachHang;