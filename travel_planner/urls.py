# urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('api/', include('travel.urls')),  # Include the URLs from the travel app
    path('', include('travel.urls')),  # Home page
]
