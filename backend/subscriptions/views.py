# backend/subscriptions/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

# Import our new email function
from .emails import send_application_notification_emails

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
        if self.action == "create":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Overrides the default create action to provide a custom success
        and error response format, and to explicitly trigger email notifications.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            # This is the key change. `perform_create` calls serializer.save(),
            # which populates `serializer.instance` with the newly created object.
            self.perform_create(serializer)

            # Now we explicitly call our email function with the new instance.
            send_application_notification_emails(serializer.instance)

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
