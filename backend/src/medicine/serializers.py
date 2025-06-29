from rest_framework import serializers
from .models import ThuocModel
from medicine_types.serializers import LoaiThuocSerializer, LoaiThuocModel
from manufacturers.serializers import HangSXSerializer, HangSXModel
from suppliers.serializers import NhaCungCapSerializer, NhaCungCapModel


class ThuocSerializer(serializers.ModelSerializer):
    MaThuoc = serializers.CharField(read_only=True)

    Loai = LoaiThuocSerializer(source='MaLoai', read_only=True)
    MaLoai = serializers.PrimaryKeyRelatedField(
        queryset=LoaiThuocModel.objects.all(), write_only=True
    )

    HangSX = HangSXSerializer(source='MaHangSX', read_only=True)
    MaHangSX = serializers.PrimaryKeyRelatedField(queryset=HangSXModel.objects.all(), write_only=True)

    NhaCungCap = NhaCungCapSerializer(source='MaNCC', read_only=True)
    MaNCC = serializers.PrimaryKeyRelatedField(queryset=NhaCungCapModel.objects.all(), write_only=True)

    TenThuoc = serializers.CharField(required=True, allow_blank=True)
    CongDung = serializers.CharField(required=False, allow_blank=True)
    DonGia = serializers.DecimalField(max_digits=12, decimal_places=2)
    SoLuongTonKho = serializers.IntegerField(min_value=0)
    HanSuDung = serializers.DateField()


    class Meta:
        model = ThuocModel
        fields = [
            'MaThuoc',
            'MaLoai',
            'Loai',
            'MaHangSX',
            'HangSX',
            'MaNCC',
            'NhaCungCap',
            'TenThuoc',
            'CongDung',
            'DonGia',
            'SoLuongTonKho',
            'HanSuDung'
        ]
        read_only_fields = ['MaThuoc']
        depth = 1
        

    def validate_TenThuoc(self, value):
        if not value.strip():
            raise serializers.ValidationError("Tên thuốc không được để trống.")
        return value

    def validate_CongDung(self, value):
        if not value.strip():
            raise serializers.ValidationError("Công dụng không được để trống.")
        return value

    def validate_DonGia(self, value):
        if value <= 0:
            raise serializers.ValidationError("Đơn giá phải lớn hơn 0.")
        return value

    def validate_SoLuongTonKho(self, value):
        if value < 0:
            raise serializers.ValidationError("Số lượng tồn kho không được âm.")
        return value

    def validate_HanSuDung(self, value):
        from datetime import date
        if value <= date.today():
            raise serializers.ValidationError("Hạn sử dụng phải sau ngày hôm nay.")
        return value
