import os
import django
import csv
import sys
import random
from datetime import datetime
from decimal import Decimal
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.src.app.settings")  
django.setup()

from users.serializers import KhachHangSerializer
from manufacturers.serializers import HangSXSerializer
from medicine_types.serializers import LoaiThuocSerializer
from suppliers.serializers import NhaCungCapSerializer
from medicine.models import ThuocModel
from manufacturers.models import HangSXModel
from medicine_types.models import LoaiThuocModel
from suppliers.models import NhaCungCapModel

def load_loai_thuoc():
    with open(os.path.join("./data", 'loai_thuoc.csv'), 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            s = LoaiThuocSerializer(data=row)
            if s.is_valid():
                s.save()
            else:
                print("Loại thuốc:", s.errors)

def load_hang_sx():
    with open(os.path.join("./data", 'hang_sx.csv'), 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            s = HangSXSerializer(data=row)
            if s.is_valid():
                s.save()
            else:
                print("Hãng SX:", s.errors)

def load_nha_cung_cap():
    with open(os.path.join("./data", 'nha_cung_cap.csv'), 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            s = NhaCungCapSerializer(data=row)
            if s.is_valid():
                s.save()
            else:
                print("NCC:", s.errors)

def load_thuoc():
    loai_list = list(LoaiThuocModel.objects.all())
    hangsx_list = list(HangSXModel.objects.all())
    ncc_list = list(NhaCungCapModel.objects.all())

    if not (loai_list and hangsx_list and ncc_list):
        print("Thiếu dữ liệu ở bảng LoaiThuoc, HangSX hoặc NhaCungCap!")
        return

    with open(os.path.join("./data", 'thuoc.csv'), 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                thuoc = ThuocModel(
                    MaLoai=random.choice(loai_list),
                    MaHangSX=random.choice(hangsx_list),
                    MaNCC=random.choice(ncc_list),
                    TenThuoc=row['TenThuoc'],
                    CongDung=row['CongDung'],
                    DonGia=Decimal(row['DonGia']),
                    SoLuongTonKho=int(row['SoLuongTonKho']),
                    HanSuDung=datetime.strptime(row['HanSuDung'], "%Y-%m-%d").date()
                )
                thuoc.save()
            except Exception as e:
                print("Lỗi tạo thuốc:", e)
                
def load_khach_hang():
    with open(os.path.join("./data", 'khach_hang.csv'), 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            s = KhachHangSerializer(data=row)
            if s.is_valid():
                s.save()
            else:
                print("Khách hàng:", s.errors)

if __name__ == '__main__':
    load_loai_thuoc()
    load_hang_sx()
    load_nha_cung_cap()
    load_thuoc()
    load_khach_hang()
    print("Đã thêm dữ liệu từ các file CSV.")
