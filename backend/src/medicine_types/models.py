import uuid
from django.db import models

class LoaiThuocModel(models.Model):

    class DonViTinhEnum(models.TextChoices):
        VIEN = 'viên', 'Viên'
        LO = 'lọ', 'Lọ'
        ONG = 'ống', 'Ống'
        CHAI = 'chai', 'Chai'
        HOP = 'hộp', 'Hộp'
        Goi = 'gói', 'Gói'

    MaLoai = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    TenLoai = models.CharField(max_length=100, blank=True, null=False)
    DonViTinh = models.CharField(
        max_length=10,
        choices=DonViTinhEnum.choices,
        default=DonViTinhEnum.VIEN
    )
    
    def __str__(self):
        return f"{self.TenLoai} - {self.DonViTinh}"
