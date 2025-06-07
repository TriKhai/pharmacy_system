from django.urls import path
from .views import *

urlpatterns = [
    path('', KhachHangList.as_view(), name='KhachHangList'),
    path('<str:maKH>/', KhachHangDetail.as_view(), name='KhachHangDetail'),
]