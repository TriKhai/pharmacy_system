from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LoaiThuocModel
from .serializers import LoaiThuocSerializer
from django.shortcuts import render

class LoaiThuocList(APIView):

    # model = LoaiThuocModel
    # serializer_class = LoaiThuocSerializer

    def get_serializer(self, *args, **kwargs):
        return LoaiThuocSerializer(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        loai_thuoc_list = LoaiThuocModel.objects.all()
        serializer = self.get_serializer(loai_thuoc_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = LoaiThuocSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class LoaiThuocDetail(APIView):
    def get_serializer(self, *args, **kwargs):
        return LoaiThuocSerializer(*args, **kwargs)
    
    def get_object(self, maLoai):
        try:
            return LoaiThuocModel.objects.get(MaLoai=maLoai)
        except LoaiThuocModel.DoesNotExist:
            return None
    def get(self, request, maLoai, *args, **kwargs):
        loai_thuoc = self.get_object(maLoai)
        if loai_thuoc is None:
            return Response({
                "error": "Không tìm thấy loại thuốc"
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(loai_thuoc)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, maLoai, *args, **kwargs):
        loai_thuoc = self.get_object(maLoai)
        if loai_thuoc is None:
            return Response({
                "error": "Không tìm thấy loại thuốc"
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(loai_thuoc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, maLoai, *args, **kwargs):
        loai_thuoc = self.get_object(maLoai)
        if loai_thuoc is None:
            return Response({
                "error": "Không tìm thấy loại thuốc"
            }, status=status.HTTP_404_NOT_FOUND)
        
        loai_thuoc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)