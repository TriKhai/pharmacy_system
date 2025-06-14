from django.urls import include, path

from users.urls import urlpatterns as user_urls
from manufacturers.urls import urlpatterns as manufacturer_urls

class APIRouter:
    urlpatterns = [
        path("user/", include(user_urls)),
        path("manufacturer/", include(manufacturer_urls)),
    ]