from django.urls import path
from .views import LoaiThuocList, LoaiThuocDetail

urlpatterns = [
    path('', LoaiThuocList.as_view(), name='LoaiThuocList'),
    path('<str:maLT>/', LoaiThuocDetail.as_view(), name='LoaiThuocDetail'),
]
