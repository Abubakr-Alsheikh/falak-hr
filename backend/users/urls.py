# backend/users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet

router = DefaultRouter()
router.register(r'', UserProfileViewSet)  # Register the ViewSet

urlpatterns = [
    path('', include(router.urls)),  # Include the router's URLs
]