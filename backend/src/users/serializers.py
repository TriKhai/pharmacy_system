from rest_framework import serializers
from .models import KhachHangModel

class KhachHangSerializer(serializers.ModelSerializer):
    MaKhachHang = serializers.CharField(read_only=True)
    TenKhachHang = serializers.CharField(required=True)
    SoDienThoai = serializers.CharField(required=True)
    DiaChi = serializers.CharField(required=True)
    
    class Meta:
        model = KhachHangModel
        fields = ['MaKhachHang', 'TenKhachHang', 'SoDienThoai', 'DiaChi']