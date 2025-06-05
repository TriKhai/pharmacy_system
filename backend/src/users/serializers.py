from rest_framework import serializers
from .models import KhachHangModel

class KhachHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhachHangModel
        fields = ['MaKhachHang', 'TenKhachHang', 'SoDienThoai', 'DiaChi']