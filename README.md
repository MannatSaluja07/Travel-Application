Travel Planner Web App

This is a travel planner web app built using Django as the backend framework. The app allows users to plan their trips, add destinations, and manage itineraries. Below are the necessary dependencies and the deployment steps.

Dependencies:
-------------
1. Python 3.x
2. Django 3.x or higher
3. psycopg2 (for PostgreSQL database support)
4. Pillow (for image handling)
5. Django REST Framework (if API endpoints are used)
6. Celery (for background tasks, if applicable)
7. Redis (for Celery task queue, if applicable)
8. other dependencies listed in requirements.txt

Installation Steps:
-------------------
1. Clone the repository to the local machine:
2. Apply migrations:python manage.py migrate
3.  Run the development server:python manage.py runserver accessible at `http://127.0.0.1:8000/`.
Configuration Files:
-------------------
1. `settings.py` - This file contains all the Django settings. Making sure to update the d API keys, and any other environment-specific configurations.

2. `urls.py` - Contains all the URL routing for the app. Ensure that the necessary routes are configured for the travel planner app.

3. `requirements.txt` - A file containing all the dependencies required for the project.
4. .env file contains the OpenWeather Api key.