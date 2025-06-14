import uuid
from django.db import models

# Create your models here.
class HangSXModel(models.Model):
    MaHangSX = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    TenHangSX = models.CharField(max_length=100, blank=True, null=False)
    QuocGia = models.CharField(max_length=50, blank=True, null=False)
    
    def __str__(self):
        return f"{self.TenHangSX} - {self.QuocGia}"
        