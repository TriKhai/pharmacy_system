import os
import django
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.src.app.settings")
django.setup()


from users.serializers import KhachHangSerializer, KhachHangModel
from manufacturers.serializers import HangSXSerializer, HangSXModel
from medicine_types.serializers import LoaiThuocSerializer, LoaiThuocModel
from suppliers.serializers import NhaCungCapSerializer
from medicine.serializers import ThuocModel
from suppliers.serializers import NhaCungCapModel
from invoice.serializers import HoaDonSerializer, HoaDonModel

def show_data():
    print("=== Danh sách thuốc ===")
    for thuoc in ThuocModel.objects.all():
        print(f"- Mã : {thuoc.MaThuoc} | Mã Loại : {thuoc.MaLoai} | Mã Hãng SX : {thuoc.MaHangSX} | Mã NCC : {thuoc.MaNCC} | Tên Thuốc: {thuoc.TenThuoc}")
    print("=== Danh sách khách hàng ===")
    for kh in KhachHangModel.objects.all():
        print(f"- Mã KH : {str(kh.MaKhachHang):<36} | Tên : {kh.TenKhachHang:<25} | SĐT: {kh.SoDienThoai:<15} | Địa chỉ: {kh.DiaChi}")
    print("=== Danh sách Hóa đơn ===")
    for hd in HoaDonModel.objects.all():
        print(f"- Mã Hóa đơn : {str(hd.MaHoaDon):<36} | Ngày Lập : {hd.NgayLap:<25} | Tổng tiền : {hd.TongTien:<15}")


if __name__ == "__main__":
    show_data()
