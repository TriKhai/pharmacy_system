from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import KhachHangModel
from .serializers import KhachHangSerializer
# Create your views here.

def hello(request):
    return HttpResponse("Hello World", content_type="text/plain")

class KhachHangList(APIView):
    
    def get_serializer(self, *args, **kwargs):
        return KhachHangSerializer(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        kh_list = KhachHangModel.objects.all()
        user_ser = self.get_serializer(kh_list, many=True)
        return Response(user_ser.data, status=200)
        
    def post(self, request):
        serializer = KhachHangSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class KhachHangDetail(APIView):

    def get_serializer(self, *args, **kwargs):
        return KhachHangSerializer(*args, **kwargs) 

    def get_object(self, maKH):
        try:
            return KhachHangModel.objects.get(MaKhachHang=maKH)
        except KhachHangModel.DoesNotExist:
            return None

    def get(self, request, maKH, *args, **kwargs):
        kh = self.get_object(maKH)
        if kh is None:
            return Response({"error": "Không tìm thấy khách hàng"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(kh)
        return Response(serializer.data)

    def put(self, request, maKH, *args, **kwargs):
        kh = self.get_object(maKH)
        if kh is None:
            return Response({"error": "Không tìm thấy khách hàng"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(kh, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, maKH, *args, **kwargs):
        kh = self.get_object(maKH)
        if kh is None:
            return Response({"error": "Không tìm thấy khách hàng"}, status=status.HTTP_404_NOT_FOUND)
        kh.delete()
        return Response({"message": "Xóa thành công"}, status=status.HTTP_204_NO_CONTENT)
