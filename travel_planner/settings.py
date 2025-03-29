# settings.py

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'your-secret-key'  # Use a secure key for production
DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']  # ✅ Added allowed hosts

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'travel',  # Your travel app
    'rest_framework',  # Django REST Framework
    'corsheaders',  # ✅ Added django-cors-headers
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ✅ Added CORS Middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'travel_planner.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend'],  # Serve frontend from here
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'travel_planner.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Using SQLite for now
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ✅ CORS SETTINGS (Fixes frontend request issues)
CORS_ALLOW_ALL_ORIGINS = True  # ⚠️ Allow all origins for testing only (disable in production)
CSRF_TRUSTED_ORIGINS = ['http://127.0.0.1:3000', 'http://localhost:3000']  # ✅ Trust frontend

# ✅ Alternative: Allow only specific frontend URLs (Uncomment in production)
# CORS_ALLOWED_ORIGINS = [
#     'http://127.0.0.1:3000',
#     'http://localhost:3000',
# ]
