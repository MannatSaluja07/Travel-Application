# serializers.py

from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.Serializer):
    destination = serializers.CharField(max_length=100)
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    itinerary = serializers.CharField()
# serializers.py

from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'destination', 'start_date', 'end_date', 'itinerary']
