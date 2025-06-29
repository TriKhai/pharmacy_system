from rest_framework import serializers
from .models import LoaiThuocModel

class LoaiThuocSerializer(serializers.ModelSerializer):
    MaLoai = serializers.CharField(read_only=True)
    TenLoai = serializers.CharField(required=True)
    DonViTinh = serializers.ChoiceField(choices=LoaiThuocModel.DonViTinhEnum.choices)

    class Meta:
        model = LoaiThuocModel
        fields = ['MaLoai', 'TenLoai', 'DonViTinh']
        
    def validate_TenLoai(self, value):
        if not value.strip():
            raise serializers.ValidationError("Tên loại không được để trống.")
        return value
    
    # "viên", "lọ", "ống", "chai", "hộp", "gói"
    def validate_DonViTinh(self, value):
        if not value.strip():
            raise serializers.ValidationError("Đơn vị tính không được để trống.")
        return value