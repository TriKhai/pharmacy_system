from rest_framework import serializers
from .models import KhachHangModel
import re

PHONE_REGEX = "^\+?[\d\s\-()]{7,20}$"

class KhachHangSerializer(serializers.ModelSerializer):
    MaKhachHang = serializers.CharField(read_only=True)
    TenKhachHang = serializers.CharField(required=True)
    SoDienThoai = serializers.CharField(required=True)
    DiaChi = serializers.CharField(required=True)
    
    class Meta:
        model = KhachHangModel
        fields = ['MaKhachHang', 'TenKhachHang', 'SoDienThoai', 'DiaChi']
        
    def validate_TenKhachHang(self, value):
        if not value.strip():
            raise serializers.ValidationError("Tên khách hàng không được để trống.")
        if KhachHangModel.objects.filter(TenKhachHang=value).exists():
            raise serializers.ValidationError("Tên khách hàng đã tồn tại.")
        return value
        
    def validate_SoDienThoai(self, value):
        if not re.match(PHONE_REGEX, value):
            raise serializers.ValidationError("Số điện thoại không hợp lệ.")
        if KhachHangModel.objects.filter(SoDienThoai=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại.")
        return value