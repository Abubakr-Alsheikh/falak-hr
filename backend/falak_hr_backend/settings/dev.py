"""
Development settings for falak_hr_backend project.
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]  # Allow all hosts during development

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# CORS configuration (moved to base, adjusted for both environments)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]

# Allow wildcard for development, be more specific in production (in prod.py)
CORS_ALLOW_ALL_ORIGINS = True  # Set to False in prod.py

# Add Browsable API Renderer in development
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] += (
    "rest_framework.renderers.BrowsableAPIRenderer",
)

# Email (for development, use console backend or a test SMTP server)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
# or, for a test SMTP server:
# EMAIL_HOST = 'smtp.mailtrap.io'
# EMAIL_PORT = 2525
# EMAIL_HOST_USER = os.getenv('MAILTRAP_USER')
# EMAIL_HOST_PASSWORD = os.getenv('MAILTRAP_PASSWORD')
# EMAIL_USE_TLS = True

# Static files (development - serving static files via runserver)
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
STATIC_ROOT = BASE_DIR / "staticfiles"
