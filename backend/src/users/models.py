import uuid
from django.db import models

# Create your models here.
class KhachHangModel(models.Model):
    MaKhachHang = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    TenKhachHang = models.CharField(max_length=100, null=False, unique=True)
    SoDienThoai = models.CharField(max_length=15, blank=True, null=False, unique=True)
    DiaChi = models.CharField(max_length=255)
    
    
    def __str__(self):
        return f"{self.TenKhachHang}"
     
    
    