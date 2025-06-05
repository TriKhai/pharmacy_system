from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import KhachHangModel
from .serializers import KhachHangSerializer
# Create your views here.

def hello(request):
    return HttpResponse("Hello World", content_type="text/plain")

class KhachHangList(APIView):
    def get(self, request):
        ds_kh = KhachHangModel.objects.all()
        serializer = KhachHangSerializer(ds_kh, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = KhachHangSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)