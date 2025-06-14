from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NhaCungCapModel
from .serializers import NhaCungCapSerializer
from django.shortcuts import render

class NhaCungCapList(APIView):

    def get_serializer(self, *args, **kwargs):
        return NhaCungCapSerializer(*args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        nha_cung_cap_list = NhaCungCapModel.objects.all()
        serializer = self.get_serializer(nha_cung_cap_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = NhaCungCapSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class NhaCungCapDetail(APIView):
    def get_serializer(self, *args, **kwargs):
        return NhaCungCapSerializer(*args, **kwargs)
    
    def get_object(self, maNCC):
        try:
            return NhaCungCapModel.objects.get(MaNCC=maNCC)
        except NhaCungCapModel.DoesNotExist:
            return None
        
    def get(self, request, maNCC, *args, **kwargs):
        nha_cung_cap = self.get_object(maNCC)
        if nha_cung_cap is None:
            return Response({
                "error": "Không tìm thấy nha cung cap"
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(nha_cung_cap)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, maNCC, *args, **kwargs):
        nha_cung_cap = self.get_object(maNCC)
        if nha_cung_cap is None:
            return Response({
                "error": "Không tìm thấy nhà cung cấp"
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(nha_cung_cap, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, maNCC, *args, **kwargs):
        nha_cung_cap = self.get_object(maNCC)
        if nha_cung_cap is None:
            return Response({
                "error": "Không tìm thấy nhà cung cấp"
            }, status=status.HTTP_404_NOT_FOUND)
        
        nha_cung_cap.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)