import os
import django
import csv
import sys
import random
from datetime import datetime
from decimal import Decimal

# Thêm đường dẫn gốc để Django nhận diện project
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Thiết lập môi trường Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.src.app.settings")
django.setup()

# Import serializer và model
from users.serializers import KhachHangSerializer
from users.models import KhachHangModel
from manufacturers.serializers import HangSXSerializer
from medicine_types.serializers import LoaiThuocSerializer
from suppliers.serializers import NhaCungCapSerializer
from medicine.models import ThuocModel
from manufacturers.models import HangSXModel
from medicine_types.models import LoaiThuocModel
from suppliers.models import NhaCungCapModel
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
