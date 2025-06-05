from rest_framework import serializers
from .models import KhachHangModel

class KhachHangSerializer(serializers.ModelSerializer):
    TenKhachHang = serializers.CharField(required=True)
    SoDienThoai = serializers.CharField(required=True)
    DiaChi = serializers.CharField(required=True)
    
    class Meta:
        model = KhachHangModel
        fields = ['TenKhachHang', 'SoDienThoai', 'DiaChi']