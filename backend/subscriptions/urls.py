# backend/subscriptions/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TrainerApplicationViewSet,
    TraineeApplicationViewSet,
    JobSeekerApplicationViewSet,
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"trainers", TrainerApplicationViewSet, basename="trainer-application")
router.register(r"trainees", TraineeApplicationViewSet, basename="trainee-application")
router.register(
    r"job-seekers", JobSeekerApplicationViewSet, basename="jobseeker-application"
)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
]
