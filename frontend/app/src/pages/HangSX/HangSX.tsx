import React, { useEffect, useState } from "react";
import type { HangSXFormType, HangSXType } from "../../types/hangSX";
import DataTable, { type Column } from "../../components/layout/DataTable";
import { createHangSX, deleteHangSX, fetchHangSXs, updateHangSX } from "../../services/hangSXApi";
import AddForm from "./AddForm";


const HangSX: React.FC = () => {
    const [HangSXs, setHangSXs] = useState<HangSXType[]>([]);
    const [HangSX, setHangSX] = useState<HangSXType | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");

    const columns: Column<HangSXType>[] = [
      {
        key: 'TenHangSX',
        label: 'Tên Hãng Sãn Xuất',
        sortValue: (row) => row.TenHangSX.toLowerCase()
      },
      {
        key: 'QuocGia',
        label: 'Quốc Gia',
        sortValue: (row) => row.QuocGia.toLowerCase()
      }
    ];

    // CSS variable
    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    // fetc danh sách hãng sản xuất
    useEffect(() => {
      const getHangSXs = async () => {
        try {
          const data = await fetchHangSXs();
          setHangSXs(data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };
      getHangSXs();
    }, []);

    // Thêm hãng sản xuất
    const handleAddHangSX = async (formData: HangSXFormType) => {
      try {
        console.log(formData)
        const newHangSX = await createHangSX(formData);
        setHangSXs([...HangSXs, newHangSX]);
        setIsOpenModal(false);
        alert("Thêm hãng sản xuất thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm hãng sản xuất:", error);
        alert("Không thể thêm hãng sản xuất");
      }
    };

    // Cập nhật thông tin hãng sản xuất
    const handleUpdateHangSX = async () => {
      if(!HangSX) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }

      const { MaHangSX, ...form } = HangSX ?? {};
      try {
        const data = await updateHangSX(MaHangSX, form);
        alert(`Đã cập nhật thành công thông tin hãng sản xuất ${data.TenHangSX}`)

        const dsHangSX = await fetchHangSXs();
        setHangSXs(dsHangSX)
        setHangSX(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    // Xóa 1 hãng sản xuất với mã hãng sản xuất
    const handleDeleteHangSX = async () => {
      if(!HangSX) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      window.confirm(`Xác nhận xóa dữ liệu hãng sản xuất "${HangSX.TenHangSX}"`);
      try {
        const message = await deleteHangSX(HangSX.MaHangSX);
        console.log(message)
        alert("Đã xóa thành công")

        const dsHangSX = await fetchHangSXs();
        setHangSXs(dsHangSX)
        setHangSX(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert("Không thể xóa dữ liệu")
      }
    }

    // Làm mới form
    const handleReset = () => {
      setHangSX(null)
    }

    const handleSearch = async () => {
      try {
        const data = await fetchHangSXs();
        const filteredData = data.filter((kh) =>
          kh.TenHangSX.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setHangSXs(filteredData);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        alert("Không thể tìm kiếm hãng sản xuất!");
      }
    }

    const handelCancelSearch = async () => {
      const data = await fetchHangSXs()
      setHangSXs(data)
      setSearchTerm("")
    }

    const handleClose = () => {
      setIsOpenModal(false);
    };

    const handleRowClick = (row: HangSXType) => {
      setHangSX(row)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setHangSX((prev) => prev ? { ...prev, [id]: value } : null);
    };
    
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<HangSXType>
            data={HangSXs}
            columns={columns}
            title="Danh sách hãng sản xuất"
            onRowClick={handleRowClick}
            selectedRowId={HangSX?.MaHangSX}
            rowKey="MaHangSX"
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin hãng sản xuất</h3>


            <div className="space-y-4 max-w-md">
              {columns.map((col) => (
                <div key={col.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <label htmlFor={col.key}>{col.label}:</label>
                  <input
                    id={col.key}
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={HangSX?.[col.key] ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={() => setIsOpenModal(true)}>
                Thêm hãng sản xuất
              </button>
              <button className={buttonClass} onClick={handleUpdateHangSX}>Lưu</button>
              <button className={buttonClass} onClick={handleDeleteHangSX}>Xóa</button>
              <button className={buttonClass} onClick={handleReset} >Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Hãng Sãn Xuất</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="searchTerm" className="">Tên hãng sản xuất:</label>
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
              <button className={buttonClass} onClick={handelCancelSearch}>
                Hủy tìm kiếm
              </button>
            </div>
          </div>
        </div>

        <div>
          <AddForm<HangSXFormType>
            title="Thêm hãng sản xuất"
            fields={[
              { name: "TenHangSX", label: "Tên Hãng Sãn Xuất", required: true },
              { name: "QuocGia", label: "Quốc gia", required: true},

            ]}
            isOpen={isOpenModal}
            onSubmit={handleAddHangSX}
            onClose={handleClose}
          />
        </div>
      </div>
    );
}

export default HangSX;