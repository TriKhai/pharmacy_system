from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import HangSXModel
from .serializers import HangSXSerializer

# Create your views here.
class HangSXList(APIView):
    def get_serilizer(self, *args, **kwargs):
        return HangSXSerializer(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        hang_sx_list = HangSXModel.objects.all()
        serializer = self.get_serilizer(hang_sx_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = HangSXSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HangSXDetail(APIView):
    def get_serializer(self, *args, **kwargs):
        return HangSXSerializer(*args, **kwargs)
    
    def get_object(self, maHangSX):
        try:
            return HangSXModel.objects.get(MaHangSX=maHangSX)
        except HangSXModel.DoesNotExist:
            return None
        
    def get(self, request, maHangSX, *args, **kwargs):
        hang_sx = self.get_object(maHangSX)
        if hang_sx is None:
            return Response({"error": "Không tìm thấy hãng sản xuất"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(hang_sx)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, maHangSX, *args, **kwargs):
        hang_sx = self.get_object(maHangSX)
        if hang_sx is None:
            return Response({"error": "Không tìm thấy hãng sản xuất"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(hang_sx, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, maHangSX, *args, **kwargs):
        hang_sx = self.get_object(maHangSX)
        if hang_sx is None:
            return Response({"error": "Không tìm thấy hãng sản xuất"}, status=status.HTTP_404_NOT_FOUND)
        
        hang_sx.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)