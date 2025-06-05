from django.urls import include, path

from users.urls import urlpatterns as user_urls

class APIRouter:
    urlpatterns = [
        path("user/", include(user_urls)),
    ]