from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ThuocModel
from .serializers import ThuocSerializer

class ThuocList(APIView):
    def get_serializer(self, *args, **kwargs):
        return ThuocSerializer(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        thuoc_list = ThuocModel.objects.all()
        serializer = self.get_serializer(thuoc_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ThuocSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ThuocDetail(APIView):
    def get_serializer(self, *args, **kwargs):
        return ThuocSerializer(*args, **kwargs)
     
    def get_object(self, maThuoc):
        try:
            return ThuocModel.objects.get(MaThuoc=maThuoc)
        except ThuocModel.DoesNotExist: 
            return None 
        
    def get(self, request, maThuoc, *args, **kwargs):
        thuoc = self.get_object(maThuoc)
        if thuoc is None:
            return Response({"error": "Không tìm thấy thuốc"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(thuoc)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, maThuoc, *args, **kwargs):
        thuoc = self.get_object(maThuoc)
        if thuoc is None:
            return Response({"error": "Không tìm thấy Thuốc"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(thuoc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, maThuoc, *args, **kwargs):
        thuoc = self.get_object(maThuoc)
        if thuoc is None:
            return Response({"error": "Không tìm thấy thuốc"}, status=status.HTTP_404_NOT_FOUND)
        
        thuoc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)