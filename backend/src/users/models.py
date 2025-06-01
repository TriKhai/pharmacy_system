from django.db import models

# Create your models here.
class KhachHang(models.Model):
    MaKhachHang = models.CharField(max_length=10, primary_key=True)
    TenKhachHang = models.CharField(max_length=100)
    SoDienThoai = models.CharField(max_length=15)
    DiaChi = models.CharField(max_length=200)
    
    def __str__(self):
        return f"{self.TenKhachHang} - {self.SoDienThoai}"