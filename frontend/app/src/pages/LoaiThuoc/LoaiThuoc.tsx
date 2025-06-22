import React, { useEffect, useState } from "react";
import type { LoaiThuocFormType, LoaiThuocType } from "../../types/loaiThuoc";
import DataTable, { type Column } from "../../components/layout/DataTable";
import { createLoaiThuoc, deleteLoaiThuoc, fetchLoaiThuocs, updateLoaiThuoc } from "../../services/loaiThuocApi";
import AddForm from "./LoaiThuocForm";


const LoaiThuoc: React.FC = () => {
    const [loaiThuocs, setLoaiThuocs] = useState<LoaiThuocType[]>([]);
    const [loaiThuoc, setLoaiThuoc] = useState<LoaiThuocType | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");

    const columns: Column<LoaiThuocType>[] = [
      { key: 'TenLoai', label: 'Tên loại' },
      { key: 'DonViTinh', label: 'Đơn vị tính' },
    ];

    // CSS variable
    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    // fetc hdanh sách loại thuốc
    useEffect(() => {
      const getLoaiThuocs = async () => {
        try {
          const data = await fetchLoaiThuocs();
          setLoaiThuocs(data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };
      getLoaiThuocs();
    }, []);

    // Thêm loại thuốc
    const handleAddLoaiThuoc = async (formData: LoaiThuocFormType) => {
      try {
        console.log(formData)
        const newLoaiThuoc = await createLoaiThuoc(formData);
        setLoaiThuocs([...loaiThuocs, newLoaiThuoc]);
        setIsOpenModal(false);
        alert("Thêm loại thuốc thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm loại thuốc:", error);
        alert("Không thể thêm loại thuốc");
      }
    };

    // Cập nhật thông tin loại thuốc
    const handleUpdateLoaiThuoc = async () => {
      if(!loaiThuoc) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }

      const { MaLoai, ...form } = loaiThuoc ?? {};
      try {
        const data = await updateLoaiThuoc(MaLoai, form);
        alert(`Đã cập nhật thành công thông tin loại thuốc ${data.TenLoai}`)

        const dsLoaiThuoc = await fetchLoaiThuocs();
        setLoaiThuocs(dsLoaiThuoc)
        setLoaiThuoc(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    // Xóa 1 loại thuốc với mã loại thuốc
    const handleDeleteLoaiThuoc = async () => {
      if(!loaiThuoc) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      window.confirm(`Xác nhận xóa dữ liệu loại thuốc "${loaiThuoc.TenLoai}"`);
      try {
        const message = await deleteLoaiThuoc(loaiThuoc.MaLoai);
        console.log(message)
        alert("Đã xóa thành công")

        const dsLoaiThuoc = await fetchLoaiThuocs();
        setLoaiThuocs(dsLoaiThuoc)
        setLoaiThuoc(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert("Không thể xóa dữ liệu")
      }
    }

    // Làm mới form
    const handleReset = () => {
      setLoaiThuoc(null)
    }

    const handleSearch = async () => {
      try {
        const data = await fetchLoaiThuocs();
        const filteredData = data.filter((lt) =>
          lt.TenLoai.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLoaiThuocs(filteredData);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        alert("Không thể tìm kiếm loại thuốc!");
      }
    }

    const handelCancelSerch = async () => {
      const data = await fetchLoaiThuocs()
      setLoaiThuocs(data)
      setSearchTerm("")
    }

    const handleClose = () => {
      setIsOpenModal(false);
    };

    const handleRowClick = (row: LoaiThuocType) => {
      setLoaiThuoc(row)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setLoaiThuoc((prev) => prev ? { ...prev, [id]: value } : null);
    };
    
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<LoaiThuocType>
            data={loaiThuocs}
            columns={columns}
            title="Danh sách loại thuốc"
            onRowClick={handleRowClick}
            selectedRow={loaiThuoc}
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin loại thuốc</h3>


            <div className="space-y-4 max-w-md">
              {columns.map((col) => (
                <div key={col.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <label htmlFor={col.key}>{col.label}:</label>
                  <input
                    id={col.key}
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={loaiThuoc?.[col.key] ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={() => setIsOpenModal(true)}>
                Thêm loại thuốc
              </button>
              <button className={buttonClass} onClick={handleUpdateLoaiThuoc}>Lưu</button>
              <button className={buttonClass} onClick={handleDeleteLoaiThuoc}>Xóa</button>
              <button className={buttonClass} onClick={handleReset} >Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Khách Hàng</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="searchTerm" className="">Tên loại thuốc:</label>
              <input
                id="searchTerm"
                type="text"
                className="border px-2 py-1 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={handleSearch}>
                Tìm kiếm
              </button>
              <button className={buttonClass} onClick={handelCancelSerch}>
                Hủy tìm kiếm
              </button>
            </div>
          </div>
        </div>

        <div>
        <AddForm<LoaiThuocFormType>
          title="Thêm loại thuốc"
          fields={[
            { name: "TenLoai", label: "Tên loại thuốc", required: true },
            {
              name: "DonViTinh",
              label: "Đơn vị tính",
              type: "select",
              required: true,
              options: [
                { value: "viên", label: "Viên" },
                { value: "lọ", label: "Lọ" },
                { value: "ống", label: "Ống" },
                { value: "chai", label: "Chai" },
                { value: "hộp", label: "Hộp" },
                { value: "gói", label: "Gói" },
              ],
            },
          ]}
          isOpen={isOpenModal}
          onSubmit={handleAddLoaiThuoc}
          onClose={handleClose}
        />
        </div>
      </div>
    );
}

export default LoaiThuoc;