import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import type { ThuocFormType } from '../../types/thuoc';
import type { NhaCungCapType } from '../../types/nhaCungCap';
import type { HangSXType } from '../../types/HangSX';
import type { LoaiThuocType } from '../../types/loaiThuoc';
import { fetchHangSXs } from '../../services/hangSXApi';
import { fetchNhaCungCaps } from '../../services/nhaCungCapApi';
import { fetchLoaiThuocs } from '../../services/loaiThuocApi';

type Props = {
  title: string;
  isOpen: boolean;
  onSubmit: (formData: ThuocFormType) => Promise<void>;
  onClose: () => void;
};

const ThuocForm: React.FC<Props> = ({ title, isOpen, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<ThuocFormType>({
        MaLoai: '',
        MaHangSX: '',
        MaNCC: '',
        TenThuoc: '',
        CongDung: '',
        DonGia: 0,
        SoLuongTonKho: 0,
        HanSuDung: new Date(),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [nhaCungCaps, setNhaCungCaps] = useState<NhaCungCapType[]>([]);
    const [hangSXs, setHangSXs] = useState<HangSXType[]>([]);
    const [loais, setLoais] = useState<LoaiThuocType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const dataHangSX = await fetchHangSXs();
                const dataNCC = await fetchNhaCungCaps();
                const dataLoai = await fetchLoaiThuocs();
                setNhaCungCaps(dataNCC); 
                setHangSXs(dataHangSX); 
                setLoais(dataLoai); 
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            } 
        };
        getData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
            name === 'DonGia' || name === 'SoLuongTonKho'
                ? parseFloat(value) || 0
                : name === 'HanSuDung'
                ? value ? new Date(value) : null
                : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!formData.MaLoai || !formData.MaHangSX || !formData.MaNCC || !formData.TenThuoc) {
            setError('Vui lòng điền đầy đủ các trường bắt buộc.');
            setLoading(false);
            return;
        }
        if (formData.DonGia < 0 || formData.SoLuongTonKho < 0) {
            setError('Đơn giá và số lượng tồn kho không được âm.');
            setLoading(false);
            return;
        }

        if (!formData.HanSuDung) {
            setError('Vui lòng chọn hạn sử dụng.');
            setLoading(false);
            return;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const hsdStr = new Date(formData.HanSuDung).toISOString().split('T')[0];

        if (hsdStr <= todayStr) {
            setError('Hạn sử dụng phải là ngày tương lai.');
            setLoading(false);
            return;
        }

        try {

        const payload = {
            ...formData,
            HanSuDung: formData.HanSuDung
                ? new Date(formData.HanSuDung).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0],
            };
        await onSubmit(payload);
        // setSuccess(`Đã thêm thành công thuốc ${formData.TenThuoc}`);

        // Refresh the drug list
        //   const dsThuoc = await fetchThuocs();
        //   setThuocs(dsThuoc); // Update thuocs state with new list

        // Reset form
        setFormData({
            MaLoai: '',
            MaHangSX: '',
            MaNCC: '',
            TenThuoc: '',
            CongDung: '',
            DonGia: 0,
            SoLuongTonKho: 0,
            HanSuDung: new Date(),
        });
            onClose(); 
        } catch (error) {
            setError('Lỗi khi thêm thuốc. Vui lòng thử lại.');
            console.error('Lỗi khi gọi API:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tên Thuốc</label>
                    <input
                        className="border px-3 py-2 rounded w-full"
                        type="text"
                        name="TenThuoc"
                        value={formData.TenThuoc}
                        onChange={handleChange}
                        required
                        placeholder="Nhập tên thuốc"
                    />
                </div>
            
                <div>
                    <label className="block mb-1 font-medium">Công Dụng</label>
                    <input
                        className="border px-3 py-2 rounded w-full"
                        type="text"
                        name="CongDung"
                        value={formData.CongDung}
                        onChange={handleChange}
                        required
                        placeholder="Nhập công dụng"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Đơn giá</label>
                    <input
                        className="border px-3 py-2 rounded w-full"
                        type="number"
                        name="DonGia"
                        value={formData.DonGia}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Số lượng tồn kho</label>
                    <input
                        className="border px-3 py-2 rounded w-full"
                        type="number"
                        name="SoLuongTonKho"
                        value={formData.SoLuongTonKho}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Hạn Sử Dụng</label>
                    <input
                        className="border px-3 py-2 rounded w-full"
                        type="date"
                        name="HanSuDung"
                        value={
                            formData.HanSuDung
                            ? new Date(formData.HanSuDung).toISOString().split('T')[0]
                            : new Date().toISOString().split('T')[0] 
                        }
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Hãng sản xuất</label>
                    <select
                        name="MaHangSX"
                        value={formData.MaHangSX}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                        required
                    >
                        <option value="">-- Chọn hãng sản xuất --</option>
                        {hangSXs.map((hsx) => (
                        <option key={hsx.MaHangSX} value={hsx.MaHangSX}>
                            {hsx.TenHangSX}
                        </option>
                        ))}
                    </select>
                </div>

                        
                <div>
                    <label className="block mb-1 font-medium">Nhà cung cấp</label>
                    <select
                        name="MaNCC"
                        value={formData.MaNCC}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                        required
                    >
                        <option value="">-- Chọn nhà cung cấp --</option>
                        {nhaCungCaps.map((ncc) => (
                        <option key={ncc.MaNCC} value={ncc.MaNCC}>
                            {ncc.TenNCC}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Loại thuốc</label>
                    <select
                        name="MaLoai"
                        value={formData.MaLoai}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full"
                        required
                    >
                        <option value="">-- Chọn loại thuốc --</option>
                        {loais.map((loai) => (
                        <option key={loai.MaLoai} value={loai.MaLoai}>
                            {loai.TenLoai}
                        </option>
                        ))}
                    </select>
                </div>
            
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1]"
                    >
                        <FontAwesomeIcon icon={faPlus} /> {loading ? 'Đang thêm...' : 'Thêm thuốc'}
                    </button>
                </div>
            
            </form>
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
        </div>
    );
};

export default ThuocForm;