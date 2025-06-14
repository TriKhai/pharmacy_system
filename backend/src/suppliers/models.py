import uuid
from django.db import models

class NhaCungCapModel(models.Model):
    MaNCC = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    TenNCC = models.CharField(max_length=100, null=False, blank=False)
    SoDienThoai = models.CharField(max_length=15, blank=True, null=False)

    def __str__(self):
        return self.TenNCC
