# views.py

from django.shortcuts import render
from rest_framework import viewsets
from .models import Trip
from .serializers import TripSerializer

# Trip view for CRUD operations
class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()  # Will be simulated without DB
    serializer_class = TripSerializer

# Home page view
def home(request):
    return render(request, 'index.html')
