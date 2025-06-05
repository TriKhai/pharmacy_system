from django.urls import path
from .views import *

urlpatterns = [
    path('KhachHangList/', KhachHangList.as_view(), name='KhachHangList'),
]