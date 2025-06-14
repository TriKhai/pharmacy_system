import uuid
from django.db import models
from medicine_types.models import LoaiThuocModel
from manufacturers.models import HangSXModel
from suppliers.models import NhaCungCapModel 

# Create your models here.
class ThuocModel(models.Model):
    MaThuoc = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    MaLoai = models.ForeignKey(LoaiThuocModel, on_delete=models.CASCADE, related_name='thuoc')
    MaHangSX = models.ForeignKey(HangSXModel, on_delete=models.CASCADE, related_name='thuoc')
    MaNCC = models.ForeignKey(NhaCungCapModel, on_delete=models.CASCADE, related_name='thuoc')
    # Ràng buộc toàn vẹn tham chiếu
    
    TenThuoc = models.CharField(max_length=100, blank=True, null=False)
    CongDung = models.TextField(blank=True)
    DonGia = models.DecimalField(max_digits=12, decimal_places=2)
    SoLuongTonKho = models.PositiveIntegerField(default=0)
    HanSuDung = models.DateField()

    def __str__(self):
        return self.TenThuoc
        