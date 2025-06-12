from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceRequestViewSet

# Create a router and register our ViewSet with it.
router = DefaultRouter()
router.register(r"service-requests", ServiceRequestViewSet, basename="service-request")

urlpatterns = [
    # The router automatically generates URLs for list, create, retrieve, etc.
    # For example:
    #   - GET /api/service-requests/ (list)
    #   - POST /api/service-requests/ (create)
    #   - GET /api/service-requests/{id}/ (retrieve)
    path("", include(router.urls)),
]
