import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import type { KhachHangType } from '../../types/khachHang';
import { fetchKhachHangs } from '../../services/khachHangApi';

import type { HoaDonFormType } from '../../types/hoaDon';

type Props = {
  title: string;
  isOpen: boolean;
  onSubmit: (formData: HoaDonFormType) => Promise<void>;
  onClose: () => void;
};

const HoaDonForm: React.FC<Props> = ({ title, isOpen, onSubmit, onClose }) => {
    const [formData, setFormData] = useState<HoaDonFormType>({
        MaKH: '',
        NgayLap: new Date().toISOString().split('T')[0],
    });
    const [khachHangs, setKhachHangs] = useState<KhachHangType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchKhachHangs();
                setKhachHangs(data);
            } catch (err) {
                console.error('Lỗi khi tải khách hàng:', err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.MaKH || !formData.NgayLap) {
            setError('Vui lòng chọn khách hàng và ngày lập.');
            setLoading(false);
            return;
        }

        try {
            await onSubmit(formData);
            onClose();
            setFormData({ MaKH: '', NgayLap: new Date().toISOString().split('T')[0] });
        } catch (err) {
            console.error(err);
            setError('Không thể tạo hóa đơn.');
        } finally {
            setLoading(false);
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Khách hàng</label>
                        <select
                            name="MaKH"
                            value={formData.MaKH}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        >
                            <option value="">-- Chọn khách hàng --</option>
                            {khachHangs.map(kh => (
                                <option key={kh.MaKhachHang} value={kh.MaKhachHang}>
                                    {kh.TenKhachHang}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ngày lập</label>
                        <input
                            type="date"
                            name="NgayLap"
                            value={formData.NgayLap}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            <FontAwesomeIcon icon={faPlus} /> {loading ? 'Đang tạo...' : 'Tạo hóa đơn'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default HoaDonForm;