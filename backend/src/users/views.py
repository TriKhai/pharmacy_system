from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.

def hello(request):
    return HttpResponse("Hello World", content_type="text/plain")
