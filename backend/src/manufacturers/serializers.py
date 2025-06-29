from rest_framework import serializers
from .models import HangSXModel

class HangSXSerializer(serializers.ModelSerializer):
    MaHangSX = serializers.CharField(read_only=True)
    TenHangSX = serializers.CharField(required=True)
    QuocGia = serializers.CharField(required=True)

    class Meta:
        model = HangSXModel
        fields = ['MaHangSX', 'TenHangSX', 'QuocGia']

    def validate_TenHangSX(self, value):
        if not value.strip():
            raise serializers.ValidationError("Tên hãng sản xuất không được để trống.")
        return value

    def validate_QuocGia(self, value):
        if not value.strip():
            raise serializers.ValidationError("Quốc gia không được để trống.")
        return value