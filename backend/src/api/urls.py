from django.urls import path, include
from users.views import hello

urlpatterns = [
    path('', hello),                  
    path('users/', include('users.urls')),    
]
