import React, { useEffect, useState } from "react";
import type { KhachHangFormType, KhachHangType } from "../../types/khachHang";
import DataTable, { type Column } from "../../components/layout/DataTable";
import { createKhachHang, deleteKhachHang, fetchKhachHangs, updateKhachHang } from "../../services/khachHangApi";
import AddForm from "./AddForm";


const KhachHang: React.FC = () => {
    const [khachHangs, setKhachHangs] = useState<KhachHangType[]>([]);
    const [khachHang, setKhachHang] = useState<KhachHangType | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    // const [searchTerm, setSearchTerm] = useState<string>("");
    const [query, setQuery] = useState("");

    
    const columns: Column<KhachHangType>[] = [
      { key: 'TenKhachHang', label: 'Tên Khách Hàng' },
      { key: 'SoDienThoai', label: 'Số Điện Thoại' },
      { key: 'DiaChi', label: 'Địa Chỉ' },
    ];

    // CSS variable
    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    // fetc hdanh sách khách hàng
    useEffect(() => {
      const getKhachHangs = async () => {
        try {
          const data = await fetchKhachHangs();
          setKhachHangs(data); 
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        } 
      };
      getKhachHangs();
    }, []);

    // Thêm khách hàng
    const handleAddKhachHang = async (formData: KhachHangFormType) => {
      try {
        console.log(formData)
        const newKhachHang = await createKhachHang(formData);
        setKhachHangs([...khachHangs, newKhachHang]);
        setIsOpenModal(false);
        alert("Thêm khách hàng thành công!");
      } catch (error : any) {
        console.error("Lỗi khi thêm khách hàng:", error);
        alert(error.message || "Đã xảy ra lỗi khi thêm khách hàng.");
      }
    };

    // Cập nhật thông tin khách hàng
    const handleUpdateKhachHang = async () => {
      if(!khachHang) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }

      const { MaKhachHang, ...form } = khachHang ?? {};
      try {
        const data = await updateKhachHang(MaKhachHang, form);
        alert(`Đã cập nhật thành công thông tin khách hàng ${data.TenKhachHang}`)

        const dsKhachHang = await fetchKhachHangs();
        setKhachHangs(dsKhachHang)
        setKhachHang(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    // Xóa 1 khách hàng với mã khách hàng
    const handleDeleteKhachHang = async () => {
      if(!khachHang) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      window.confirm(`Xác nhận xóa dữ liệu khách hàng "${khachHang.TenKhachHang}"`);
      try {
        const message = await deleteKhachHang(khachHang.MaKhachHang);
        console.log(message)
        alert("Đã xóa thành công")

        const dsKhachHang = await fetchKhachHangs();
        setKhachHangs(dsKhachHang)
        setKhachHang(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert("Không thể xóa dữ liệu")
      }
    }

    // Làm mới form
    const handleReset = () => {
      setKhachHang(null)
    }

    // const handleSearch = async () => {
    //   try {
    //     const data = await fetchKhachHangs();
    //     const filteredData = data.filter((kh) =>
    //       kh.TenKhachHang.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setKhachHangs(filteredData);
    //   } catch (error) {
    //     console.error("Lỗi khi tìm kiếm:", error);
    //     alert("Không thể tìm kiếm khách hàng!");
    //   }
    // }

    // const handelCancelSerch = async () => {
    //   const data = await fetchKhachHangs()
    //   setKhachHangs(data)
    //   setSearchTerm("")
    // }

    const handleClose = () => {
      setIsOpenModal(false);
    };

    const handleRowClick = (row: KhachHangType) => {
      setKhachHang(row)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setKhachHang((prev) => prev ? { ...prev, [id]: value } : null);
    };

    const filterData: KhachHangType[] =
      query.length > 0
        ? khachHangs.filter((kh: KhachHangType) => {
            return kh.TenKhachHang.toLowerCase().includes(query.toLowerCase());
          })
        : khachHangs;
    
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<KhachHangType>
            data={filterData}
            columns={columns}
            title="Danh sách khách hàng"
            onRowClick={handleRowClick}
            selectedRow={khachHang}
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin khách hàng</h3>


            <div className="space-y-4 max-w-md">
              {columns.map((col) => (
                <div key={col.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
                  <label htmlFor={col.key}>{col.label}:</label>
                  <input
                    id={col.key}
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={khachHang?.[col.key] ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={() => setIsOpenModal(true)}>
                Thêm khách hàng
              </button>
              <button className={buttonClass} onClick={handleUpdateKhachHang}>Lưu</button>
              <button className={buttonClass} onClick={handleDeleteKhachHang}>Xóa</button>
              <button className={buttonClass} onClick={handleReset} >Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Khách Hàng</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="searchTerm" className="">Tên khách hàng:</label>
              <input
                id="searchTerm"
                type="text"
                className="border px-2 py-1 w-full" 
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />
            </div>
            {/* <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={handleSearch}>
                Tìm kiếm
              </button>
              <button className={buttonClass} onClick={handelCancelSerch}>
                Hủy tìm kiếm
              </button>
            </div> */}
          </div>
        </div>

        <div>
          <AddForm<KhachHangFormType>
            title="Thêm khách hàng"
            fields={[
              { name: "TenKhachHang", label: "Tên Khách Hàng", required: true },
              { name: "SoDienThoai", label: "Số Điện Thoại", required: true},
              { name: "DiaChi", label: "Địa Chỉ" },
            ]}
            isOpen={isOpenModal}
            onSubmit={handleAddKhachHang}
            onClose={handleClose}
          />
        </div>
      </div>
    );
}

export default KhachHang;