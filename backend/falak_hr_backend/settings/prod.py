"""
Production settings for falak_hr_backend project.
"""

from .base import *
import os

DEBUG = False

ALLOWED_HOSTS = ["falakhr.sa", "www.falakhr.sa", "162.241.115.35"]

# DATABASES = {
#     "default": {
#         "ENGINE": os.getenv("DB_ENGINE"),
#         "NAME": os.getenv("DB_NAME"),
#         "USER": os.getenv("DB_USER"),
#         "PASSWORD": os.getenv("DB_PASSWORD"),
#         "HOST": os.getenv("DB_HOST"),
#         "PORT": os.getenv("DB_PORT"),
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# CORS: Restrict to your frontend's origin
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://falakhr.sa",
    "https://www.falakhr.sa",
]


# Email configuration (replace with your actual production email settings)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"  # Your SMTP server
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

# Static files (production - typically served by a web server like Nginx or Apache)
STATIC_ROOT = BASE_DIR / "staticfiles"  # Collect static files here
# Configure your web server to serve files from this directory.

# Security settings (consider enabling these in production):
SECURE_HSTS_SECONDS = 31536000  # Enable HTTP Strict Transport Security (HSTS)
SECURE_SSL_REDIRECT = True  # Redirect HTTP requests to HTTPS
SESSION_COOKIE_SECURE = True  # Only send session cookies over HTTPS
CSRF_COOKIE_SECURE = True  # Only send CSRF cookies over HTTPS
SECURE_HSTS_INCLUDE_SUBDOMAINS = True  # Include subdomains in HSTS
SECURE_HSTS_PRELOAD = True  # Preload HSTS in browsers
