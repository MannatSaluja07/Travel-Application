# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, home  # Import home function

router = DefaultRouter()
router.register(r'trips', TripViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('home/', home, name='home'), 
]
