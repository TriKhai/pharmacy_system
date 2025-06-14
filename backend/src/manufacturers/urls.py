from django.urls import path
from .views import HangSXList, HangSXDetail

urlpatterns = [
    path('', HangSXList.as_view(), name='HangSXList'),
    path('<str:maHangSX>/', HangSXDetail.as_view(), name='HangSXDetail'),
]