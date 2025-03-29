# models.py

from django.db import models

class Trip(models.Model):  # Make Trip a Django Model
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    itinerary = models.TextField()

    def __str__(self):
        return f"{self.destination} ({self.start_date} - {self.end_date})"
