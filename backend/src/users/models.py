from django.db import models

# Create your models here.
class KhachHangModel(models.Model):
    MaKhachHang = models.AutoField(primary_key=True)
    TenKhachHang = models.CharField(max_length=100, null=False)
    SoDienThoai = models.CharField(max_length=15, null=False)
    DiaChi = models.CharField(max_length=255)
    
    
    def __str__(self):
        return f"{self.TenKhachHang} - {self.SoDienThoai}"
     
    
    