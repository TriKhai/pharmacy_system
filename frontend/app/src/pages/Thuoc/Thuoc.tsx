import React, { useEffect, useState, type ReactNode } from "react";
import DataTable, { type Column } from "../../components/layout/DataTable";
import type { ThuocFormType, ThuocType } from "../../types/thuoc";
import { createThuoc, deleteThuoc, fetchThuocs, updateThuoc } from "../../services/thuocApi";
import type { NhaCungCapType } from "../../types/nhaCungCap";
import type { HangSXType } from "../../types/hangSX";
import type { LoaiThuocType } from "../../types/loaiThuoc";
import { fetchHangSXs } from "../../services/hangSXApi";
import { fetchNCC } from "../../services/nhaCungCapApi";
import { fetchLoaiThuoc } from "../../services/loaiThuocApi";
import ThuocForm from "./ThuocForm";


const Thuoc: React.FC = () => {
    const [thuocs, setThuocs] = useState<ThuocType[]>([]);
    const [thuoc, setThuoc] = useState<ThuocType | null>(null);
    const [nhaCungCaps, setNhaCungCaps] = useState<NhaCungCapType[]>([]);
    const [hangSXs, setHangSXs] = useState<HangSXType[]>([]);
    const [loais, setLoais] = useState<LoaiThuocType[]>([]);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const columns: Column<ThuocType>[] = [
      { key: 'TenThuoc', label: 'Tên thuốc' },
      { key: 'CongDung', label: 'Công dụng' },
      {
          key: 'DonGia',
          label: 'Đơn giá',
          render: (_, record) => Number(record.DonGia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      },
      {
          key: 'SoLuongTonKho',
          label: 'Số lượng kho',
          render: (_, record) => record.SoLuongTonKho.toString(),
      },
      {
          key: 'HanSuDung',
          label: 'Hạn sử dụng',
          render: (_, record) =>
            record.HanSuDung
              ? new Date(record.HanSuDung).toLocaleDateString('vi-VN')
              : 'Không có',
      },
      {
          key: 'HangSX',
          label: 'Hãng sản xuất',
          render: (_, record) => record.HangSX?.TenHangSX ?? 'N/A',
      },
      {
          key: 'NhaCungCap',
          label: 'Nhà cung cấp',
          render: (_, record) => record.NhaCungCap?.TenNCC ?? 'N/A',
      },
      {
          key: 'Loai',
          label: 'Loại thuốc',
          render: (_, record) => record.Loai?.TenLoai ?? 'N/A',
      },
    ];

    const title = "Danh sách thuốc"

    const buttonClass = "bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1] transition";

    useEffect(() => {
          const getThuocs = async () => {
            try {
              const data = await fetchThuocs();
              const dataHangSX = await fetchHangSXs();
              const dataNCC = await fetchNCC();
              const dataLoai = await fetchLoaiThuoc();
              setThuocs(data); 
              setNhaCungCaps(dataNCC); 
              setHangSXs(dataHangSX); 
              setLoais(dataLoai); 
            } catch (error) {
              console.error('Lỗi khi gọi API:', error);
            } 
          };
          getThuocs();
    }, []);

    const handleAdd = async (formData: ThuocFormType) => {
      try {
        console.log(formData)
        const newThuoc = await createThuoc(formData);
        setThuocs([...thuocs, newThuoc]);
        setIsOpenModal(false);
        alert(`Thêm thành công thuốc ${newThuoc.TenThuoc}!`);
      } catch (error) {
        console.error("Lỗi khi thêm thuốc:", error);
        alert("Không thể thêm thuốc");
      }
    };

    const handleUpdate = async () => {
      if(!thuoc) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      
      const {
        MaThuoc,
        Loai: { MaLoai },
        HangSX: { MaHangSX },
        NhaCungCap: { MaNCC },
        TenThuoc,
        CongDung = '',
        DonGia,
        SoLuongTonKho,
        HanSuDung,
        
      } = thuoc ?? {};

      const form: ThuocFormType = {
        MaLoai,
        MaHangSX,
        MaNCC,
        TenThuoc,
        CongDung,
        DonGia,
        SoLuongTonKho,
        HanSuDung,
      };

      try {
        const data = await updateThuoc(MaThuoc, form);
        alert(`Đã cập nhật thành công thông tin thuốc ${data.TenThuoc}`)

        const dsThuoc = await fetchThuocs();
        setThuocs(dsThuoc)
        setThuoc(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    const handleDelete = async () => {
      if(!thuoc) {
        alert("Chưa có dữ liệu cập nhật!")
        return;
      }
      window.confirm(`Xác nhận xóa dữ liệu thuốc "${thuoc.TenThuoc}"`);
      try {
        const message = await deleteThuoc(thuoc.MaThuoc);
        console.log(message)
        alert("Đã xóa thành công")

        const dsThuoc = await fetchThuocs();
        setThuocs(dsThuoc)
        setThuoc(null)
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert("Không thể xóa dữ liệu")
      }
    }

    const handleReset = () => {
      setThuoc(null)
    }

    const handleSearch = async () => {
      try {
        const data = await fetchThuocs();
        const filteredData = data.filter((kh) =>
          kh.TenThuoc.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setThuocs(filteredData);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        alert("Không thể tìm kiếm thuốc!");
      }
    }

    const handelCancelSearch = async () => {
      const data = await fetchThuocs()
      setThuocs(data)
      setSearchTerm("")
    }

    const handleClose = () => {
      setIsOpenModal(false);
    };

    const handleRowClick = (row: ThuocType) => {
      setThuoc(row)
    }

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
      key: string
    ) => {
      const { value } = e.target;

      setThuoc((prev) => {
        const thuoc: ThuocType = prev ?? {
          MaThuoc: '',
          TenThuoc: '',
          CongDung: '',
          DonGia: 0,
          SoLuongTonKho: 0,
          HanSuDung: null,
          Loai: { MaLoai: '', TenLoai: '', DonViTinh: '' },
          HangSX: { MaHangSX: '', TenHangSX: '', QuocGia: '' },
          NhaCungCap: { MaNCC: '', TenNCC: '', SoDienThoai: '' },
        };

        switch (key) {
          case 'HangSX': {
            const selectedHangSX = hangSXs.find((hsx) => hsx.MaHangSX === value);
            return {
              ...thuoc,
              HangSX: {
                MaHangSX: value,
                TenHangSX: selectedHangSX?.TenHangSX ?? '',
                QuocGia: selectedHangSX?.QuocGia ?? '',
              },
            };
          }

          case 'NhaCungCap': {
            const selectedNCC = nhaCungCaps.find((ncc) => ncc.MaNCC === value);
            return {
              ...thuoc,
              NhaCungCap: {
                MaNCC: value,
                TenNCC: selectedNCC?.TenNCC ?? '',
                SoDienThoai: selectedNCC?.SoDienThoai ?? '',
              },
            };
          }

          case 'Loai': {
            const selectedLoai = loais.find((loai) => loai.MaLoai === value);
            return {
              ...thuoc,
              Loai: {
                MaLoai: value,
                TenLoai: selectedLoai?.TenLoai ?? '',
                DonViTinh: selectedLoai?.DonViTinh ?? '',
              },
            };
          }

          case 'SoLuongTonKho':
            return {
              ...thuoc,
              SoLuongTonKho: Math.max(0, Number(value)),
            };

          case 'DonGia':
            return {
              ...thuoc,
              DonGia: Number(value.replace(/[^0-9.]/g, '')) || 0,
            };

          case 'HanSuDung': {
            const date = new Date(value);
            if (isNaN(date.getTime())) return thuoc;
            return {
              ...thuoc,
              HanSuDung: date,
            };
          }

          default:
            return {
              ...thuoc,
              [key]: value,
            };
        }
      });
    };


    const renderInput = (
        obj: ThuocType | null,
        key: string,
    ): ReactNode => {
      if (!obj) return (
        <input
          id={key}
          type="number"
          className="border px-2 py-1 w-full"
          placeholder="Chọn thuốc để hiển thị..."
          onChange={() => alert("Vui lòng chọn thuốc để hiển thị!")}
          value=''
        />
      );

      switch (key) {
        case 'TenThuoc': {
          return (
            <input
              id={key}
              type="text"
              className="border px-2 py-1 w-full"
              value={String(obj[key] ?? '')}
              onChange={(e) => handleInputChange(e, key)}
            />
          )
        }
          
        case 'CongDung': {
          return (
            <textarea 
              id={key}
              className="border px-2 py-1 w-full"
              value={String(obj.CongDung ?? '')}
              onChange={(e) => handleInputChange(e, key)}
            />
          );
        }
              

        case 'DonGia':
        case 'SoLuongTonKho': {
          return (
            <input
              id={key}
              type="number"
              className="border px-2 py-1 w-full"
              value={obj[key] ?? 0}
              onChange={(e) => handleInputChange(e, key)}
              />
          );
        }
          
        case 'HanSuDung': {
          let dateValue = '';

          if (obj.HanSuDung instanceof Date) {
            dateValue = obj.HanSuDung.toISOString().split('T')[0];
          } else if (typeof obj.HanSuDung === 'string') {
            // Đảm bảo chuỗi có định dạng hợp lệ YYYY-MM-DD
            const parsedDate = new Date(obj.HanSuDung);
            if (!isNaN(parsedDate.getTime())) {
              dateValue = parsedDate.toISOString().split('T')[0];
            }
          }

          return (
            <input
              id={key}
              type="date"
              className="border px-2 py-1 w-full"
              value={dateValue}
              onChange={(e) => handleInputChange(e, key)}
            />
          );
        }

        case 'HangSX': {
          return (
            <select
              id={key}
              className="border px-2 py-1 w-full"
              value={obj.HangSX?.MaHangSX ?? ''}
              onChange={(e) => handleInputChange(e, key)}
            >
              {hangSXs.map((hsx) => (
                <option key={hsx.MaHangSX} value={hsx.MaHangSX}>
                  {hsx.TenHangSX}
                </option>
              ))}
            </select>
        );
      }
      
      case 'NhaCungCap': {
        return (
          <select
            id={key}
            className="border px-2 py-1 w-full"
            value={obj.NhaCungCap?.MaNCC ?? ''}
            onChange={(e) => handleInputChange(e, key)}
          >
            {nhaCungCaps.map((ncc) => (
              <option key={ncc.MaNCC} value={ncc.MaNCC}>
                {ncc.TenNCC}
              </option>
            ))}
          </select>
        );
      }

      case 'Loai': {
        return (
          <select
            id={key}
            className="border px-2 py-1 w-full"
            value={obj.Loai?.MaLoai ?? ''}
            onChange={(e) => handleInputChange(e, key)}
          >
            {loais.map((loai) => (
              <option key={loai.MaLoai} value={loai.MaLoai}>
                {loai.TenLoai}
              </option>
            ))}
          </select>
        );
      }

      default: {
            return <div>Không hỗ trợ trường này</div>;
      } 
   }
    };
    
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DataTable<ThuocType>
            data={thuocs}
            columns={columns}
            title={title}
            onRowClick={handleRowClick}
          />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Thông tin thuốc</h3>


            <div className="space-y-4 max-w-md">
              {columns.map((col) => (
                <div key={col.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
                    <label htmlFor={col.key}>{col.label}:</label>
                    {renderInput(thuoc, col.key)}
                </div>
            ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className={buttonClass} onClick={() => setIsOpenModal(true)}>
                Thêm Thuốc
              </button>
              <button className={buttonClass} onClick={handleUpdate}>Lưu</button>
              <button className={buttonClass} onClick={handleDelete}>Xóa</button>
              <button className={buttonClass} onClick={handleReset} >Làm mới</button>
            </div>
          </div>

          <div className="p-4 shadow rounded">
            <h3 className="font-semibold mb-4">Tìm Kiếm Thuốc</h3>
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <label htmlFor="searchTerm" className="">Tên huốc:</label>
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
          <ThuocForm
            title="Thêm thuốc mới"
            isOpen={isOpenModal}
            onSubmit={handleAdd}
            onClose={handleClose}
          />
        </div>
      </div>
    );
}

export default Thuoc;