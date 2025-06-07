import React, { useEffect, useState } from "react";
import type { KhachHangType } from "../../types/khachHang";
import axiosClient from "../../config/axios";
import DataTable, { type Column } from "../../components/layout/DataTable";


const KhachHang: React.FC = () => {
    const [khachHangs, setKhachHangs] = useState<KhachHangType[]>([]);
    const [formData, setFormData] = useState({
      TenKhachHang: "",
      SoDienThoai: "",
      DiaChi: "",
    });

    useEffect(() => {
      const fetchKhachHangs = async () => {
        try {
          const response = await axiosClient.get<KhachHangType[]>('user');
          // console.log('API trả về:', response.data);

          setKhachHangs(response.data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };

      fetchKhachHangs();
    }, []);

    const addKhachHang = async () => {
      try {
        const response = await axiosClient.post<KhachHangType>('user/', formData);
        setKhachHangs([...khachHangs, response.data]);
        setFormData({
          TenKhachHang: "",
          SoDienThoai: "",
          DiaChi: "",
        });
      } catch (error) {
        console.error('Lỗi khi thêm khách hàng:', error);
      }
    }


    const columns: Column<KhachHangType>[] = [
      // { key: 'MaKhachHang', label: 'Mã Khách Hàng' },
      { key: 'TenKhachHang', label: 'Tên Khách Hàng' },
      { key: 'SoDienThoai', label: 'Số Điện Thoại' },
      { key: 'DiaChi', label: 'Địa Chỉ' },
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
                <label htmlFor="TenKhachHang">Tên Khách Hàng:</label>
                <input
                  id="TenKhachHang"
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={formData.TenKhachHang}
                  onChange={(e) =>
                    setFormData({ ...formData, TenKhachHang: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="SoDienThoai">Số Điện Thoại:</label>
                <input
                  id="SoDienThoai"
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={formData.SoDienThoai}
                  onChange={(e) =>
                    setFormData({ ...formData, SoDienThoai: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <label htmlFor="DiaChi">Địa Chỉ:</label>
                <input
                  id="DiaChi"
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={formData.DiaChi}
                  onChange={(e) =>
                    setFormData({ ...formData, DiaChi: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={addKhachHang}>
                Thêm khách hàng
              </button>
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