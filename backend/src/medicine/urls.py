from django.urls import path
from .views import ThuocList, ThuocDetail

urlpatterns = [
    path('', ThuocList.as_view(), name='ThuocList'),
    path('<str:maThuoc>/', ThuocDetail.as_view(), name='ThuocDetail'),
]
