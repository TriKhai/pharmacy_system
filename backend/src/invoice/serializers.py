from rest_framework import serializers
from .models import HoaDonModel, ChiTietHoaDonModel
from datetime import date
from django.db.models import Sum, F, DecimalField, ExpressionWrapper
from users.models import KhachHangModel
from medicine.models import ThuocModel
from medicine.serializers import ThuocSerializer 
from users.serializers import KhachHangSerializer

class ChiTietHoaDonSerializer(serializers.ModelSerializer):
    MaChiTietHD = serializers.CharField(read_only=True)
    MaHoaDon = serializers.PrimaryKeyRelatedField(
        queryset=HoaDonModel.objects.all(),
        write_only=True,
    )
    MaThuoc = serializers.PrimaryKeyRelatedField(
        queryset=ThuocModel.objects.all()
    )
    SoLuongBan = serializers.IntegerField(min_value=1)
    GiaBan = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=0)

    # Thêm thông tin chi tiết thuốc (nested)
    Thuoc = ThuocSerializer(source='MaThuoc', read_only=True)

    class Meta:
        model = ChiTietHoaDonModel
        fields = ['MaChiTietHD', 'MaHoaDon', 'MaThuoc', 'Thuoc', 'SoLuongBan', 'GiaBan']

    def validate(self, data):
        thuoc = data['MaThuoc']
        so_luong_ban = data['SoLuongBan']

        if thuoc.SoLuongTonKho < so_luong_ban:
            raise serializers.ValidationError(
                f"Số lượng tồn kho không đủ. Hiện còn {thuoc.so_luong} viên."
            )

        return data

    def create(self, validated_data):
        thuoc = validated_data['MaThuoc']
        so_luong_ban = validated_data['SoLuongBan']

        # Trừ tồn kho sau khi tạo chi tiết
        thuoc.SoLuongTonKho -= so_luong_ban
        thuoc.save()

        return super().create(validated_data)

class HoaDonSerializer(serializers.ModelSerializer):
    MaHoaDon = serializers.CharField(read_only=True)
    MaKH = KhachHangSerializer(read_only=True) 
    NgayLap = serializers.DateField()
    TongTien = serializers.DecimalField(
        max_digits=12, decimal_places=2, read_only=True
    )

    # Nested danh sách chi tiết hóa đơn
    ChiTiet = ChiTietHoaDonSerializer(source='chitiethoadon', many=True, read_only=True)

    class Meta:
        model = HoaDonModel
        fields = ['MaHoaDon', 'MaKH', 'NgayLap', 'TongTien', 'ChiTiet']

    def validate_NgayLap(self, value):
        if value > date.today():
            raise serializers.ValidationError("Ngày lập không được lớn hơn hôm nay.")
        return value

    def to_representation(self, instance):
        # Tự động tính Tổng tiền bằng biểu thức tính toán trong queryset
        instance.TongTien = ChiTietHoaDonModel.objects.filter(MaHoaDon=instance).aggregate(
            tong=Sum(
                ExpressionWrapper(F('GiaBan') * F('SoLuongBan'), output_field=DecimalField(max_digits=12, decimal_places=2))
            )
        )['tong'] or 0

        return super().to_representation(instance)
