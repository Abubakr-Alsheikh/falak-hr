from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import TrainerApplication, TraineeApplication, JobSeekerApplication
from .serializers import (
    TrainerApplicationSerializer,
    TraineeApplicationSerializer,
    JobSeekerApplicationSerializer,
)


class CustomApplicationCreateView(generics.CreateAPIView):
    """
    A custom base view for creating applications that provides
    a standardized success and error response format as per the API spec.
    """

    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
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


class TrainerApplicationCreateView(CustomApplicationCreateView):
    """
    Handles POST requests to /api/subscriptions/trainers/
    Creates a new TrainerApplication instance.
    """

    queryset = TrainerApplication.objects.all()
    serializer_class = TrainerApplicationSerializer


class TraineeApplicationCreateView(CustomApplicationCreateView):
    """
    Handles POST requests to /api/subscriptions/trainees/
    Creates a new TraineeApplication instance.
    """

    queryset = TraineeApplication.objects.all()
    serializer_class = TraineeApplicationSerializer


class JobSeekerApplicationCreateView(CustomApplicationCreateView):
    """
    Handles POST requests to /api/subscriptions/job-seekers/
    Creates a new JobSeekerApplication instance.
    """

    queryset = JobSeekerApplication.objects.all()
    serializer_class = JobSeekerApplicationSerializer
