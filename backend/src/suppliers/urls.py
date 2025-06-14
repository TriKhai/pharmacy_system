from django.urls import path
from .views import NhaCungCapList, NhaCungCapDetail

urlpatterns = [
    path('', NhaCungCapList.as_view(), name='NhaCungCapList'),
    path('<str:maNCC>/', NhaCungCapDetail.as_view(), name='NhaCungCapDetail'),
]
