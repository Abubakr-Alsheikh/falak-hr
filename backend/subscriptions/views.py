# backend/subscriptions/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import TrainerApplication, TraineeApplication, JobSeekerApplication
from .serializers import (
    TrainerApplicationSerializer,
    TraineeApplicationSerializer,
    JobSeekerApplicationSerializer,
)


class BaseApplicationViewSet(viewsets.ModelViewSet):
    """
    A base ViewSet that provides the standard `list`, `retrieve`, `update`,
    and `destroy` actions, along with a custom `create` action.

    Permissions are handled dynamically:
    - `create`: Allowed for any user (public form submission).
    - `list`, `retrieve`, `update`, `destroy`: Restricted to admin users.
    """

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "create":
            self.permission_classes = [AllowAny]
        else:
            # Only admin users can list, retrieve, or modify submissions
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Overrides the default create action to provide a custom success
        and error response format as per the API specification.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=False):  # We handle exception manually
            self.perform_create(serializer)
            # Custom success response
            return Response(
                {"message": "تم استلام طلبك بنجاح. شكراً لك."},
                status=status.HTTP_201_CREATED,
            )

        # Custom error response
        return Response(
            {
                "detail": "Invalid input provided.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class TrainerApplicationViewSet(BaseApplicationViewSet):
    """
    API endpoint for Trainer Applications.
    Provides list, create, retrieve, update, and destroy actions.
    """

    queryset = TrainerApplication.objects.all().order_by("-created_at")
    serializer_class = TrainerApplicationSerializer


class TraineeApplicationViewSet(BaseApplicationViewSet):
    """
    API endpoint for Trainee Applications.
    Provides list, create, retrieve, update, and destroy actions.
    """

    queryset = TraineeApplication.objects.all().order_by("-created_at")
    serializer_class = TraineeApplicationSerializer


class JobSeekerApplicationViewSet(BaseApplicationViewSet):
    """
    API endpoint for Job Seeker Applications.
    Provides list, create, retrieve, update, and destroy actions.
    """

    queryset = JobSeekerApplication.objects.all().order_by("-created_at")
    serializer_class = JobSeekerApplicationSerializer
