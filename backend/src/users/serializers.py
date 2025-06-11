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
        
    def validate_SoDienThoai(self, value):
        if not re.match(PHONE_REGEX, value):
            raise serializers.ValidationError("Số điện thoại không hợp lệ.")
        return value