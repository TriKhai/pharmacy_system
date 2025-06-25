from django.urls import path
from .views import *

urlpatterns = [
    # HÓA ĐƠN
    path('', HoaDonListCreateView.as_view(), name='HoaDonListCreate'),
    path('a/<str:pk>/', HoaDonDetailView.as_view(), name='HoaDonDetail'),

    # CHI TIẾT HÓA ĐƠN
    path('details/', ChiTietHoaDonListCreateView.as_view(), name='ChiTietHoaDon-list-create'),
    path('detail/<str:pk>/', ChiTietHoaDonDetailView.as_view(), name='ChiTietHoaDon-detail'),
]
