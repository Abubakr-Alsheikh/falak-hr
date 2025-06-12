from django.urls import path
from .views import ServiceRequestCreateAPIView

urlpatterns = [
    # Endpoint URL: /api/service-requests (when included under /api/)
    path(
        "service-requests",
        ServiceRequestCreateAPIView.as_view(),
        name="create-service-request",
    ),
]
