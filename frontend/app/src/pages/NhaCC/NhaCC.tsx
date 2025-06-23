import React, { useEffect, useState } from "react";
import type { NhaCungCapFormType, NhaCungCapType } from "../../types/nhaCungCap";
import DataTable, { type Column } from "../../components/layout/DataTable";
import { createNhaCungCap, deleteNhaCungCap, fetchNhaCungCaps, updateNhaCungCap } from "../../services/nhaCungCapApi";
import NCCForm from "./NhaCCForm";


const NhaCungCap: React.FC = () => {
    const [nhaCungCaps, setNhaCungCaps] = useState<NhaCungCapType[]>([]);
    const [nhaCungCap, setNhaCungCap] = useState<NhaCungCapType | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");

    const columns: Column<NhaCungCapType>[] = [
      { key: 'TenNCC', label: 'Tên nhà cung cấp' },
      { key: 'SoDienThoai', label: 'Số Điện Thoại' },
    ];

    // CSS variable
    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    // fetc hdanh sách nhà cung cấp
    useEffect(() => {
      const getNhaCungCaps = async () => {
        try {
          const data = await fetchNhaCungCaps();
          setNhaCungCaps(data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };
      getNhaCungCaps();
    }, []);

    // Thêm nhà cung cấp
    const handleAddNhaCungCap = async (formData: NhaCungCapFormType) => {
      try {
        console.log(formData)
        const newNhaCungCap = await createNhaCungCap(formData);
        setNhaCungCaps([...nhaCungCaps, newNhaCungCap]);
        setIsOpenModal(false);
        alert("Thêm nhà cung cấp thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm nhà cung cấp:", error);
        alert("Không thể thêm nhà cung cấp");
      }
    };

    // Cập nhật thông tin nhà cung cấp
    const handleUpdateNhaCungCap = async () => {
      if(!nhaCungCap) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }

      const { MaNCC, ...form } = nhaCungCap ?? {};
      try {
        const data = await updateNhaCungCap(MaNCC, form);
        alert(`Đã cập nhật thành công thông tin nhà cung cấp ${data.TenNCC}`)

        const dsNhaCungCap = await fetchNhaCungCaps();
        setNhaCungCaps(dsNhaCungCap)
        setNhaCungCap(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    // Xóa 1 nhà cung cấp với mã nhà cung cấp
    const handleDeleteNhaCungCap = async () => {
      if(!nhaCungCap) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      window.confirm(`Xác nhận xóa dữ liệu nhà cung cấp "${nhaCungCap.TenNCC}"`);
      try {
        const message = await deleteNhaCungCap(nhaCungCap.MaNCC);
        console.log(message)
        alert("Đã xóa thành công")

        const dsNhaCungCap = await fetchNhaCungCaps();
        setNhaCungCaps(dsNhaCungCap)
        setNhaCungCap(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert("Không thể xóa dữ liệu")
      }
    }

    // Làm mới form
    const handleReset = () => {
      setNhaCungCap(null)
    }

    const handleSearch = async () => {
      try {
        const data = await fetchNhaCungCaps();
        const filteredData = data.filter((kh) =>
          kh.TenNCC.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setNhaCungCaps(filteredData);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        alert("Không thể tìm kiếm nhà cung cấp!");
      }
    }

    const handelCancelSerch = async () => {
      const data = await fetchNhaCungCaps()
      setNhaCungCaps(data)
      setSearchTerm("")
    }

    const handleClose = () => {
      setIsOpenModal(false);
    };

    const handleRowClick = (row: NhaCungCapType) => {
      setNhaCungCap(row)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setNhaCungCap((prev) => prev ? { ...prev, [id]: value } : null);
    };
    
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<NhaCungCapType>
            data={nhaCungCaps}
            columns={columns}
            title="Danh sách nhà cung cấp"
            onRowClick={handleRowClick}
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin nhà cung cấp</h3>


            <div className="space-y-4 max-w-md">
              {columns.map((col) => (
                <div key={col.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <label htmlFor={col.key}>{col.label}:</label>
                  <input
                    id={col.key}
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={nhaCungCap?.[col.key] ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={() => setIsOpenModal(true)}>
                Thêm nhà cung cấp
              </button>
              <button className={buttonClass} onClick={handleUpdateNhaCungCap}>Lưu</button>
              <button className={buttonClass} onClick={handleDeleteNhaCungCap}>Xóa</button>
              <button className={buttonClass} onClick={handleReset} >Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Nhà Cung Cấp</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="searchTerm" className="">Tên nhà cung cấp:</label>
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
          <NCCForm<NhaCungCapFormType>
            title="Thêm nhà cung cấp"
            fields={[
              { name: "TenNCC", label: "Tên nhà cung cấp", required: true },
              { name: "SoDienThoai", label: "Số Điện Thoại", required: true},
            ]}
            isOpen={isOpenModal}
            onSubmit={handleAddNhaCungCap}
            onClose={handleClose}
          />
        </div>
      </div>
    );
}

export default NhaCungCap;