from django.urls import path
from .views import (
    TrainerApplicationCreateView,
    TraineeApplicationCreateView,
    JobSeekerApplicationCreateView,
)

app_name = "subscriptions"

urlpatterns = [
    path(
        "trainers/",
        TrainerApplicationCreateView.as_view(),
        name="trainer-application-create",
    ),
    path(
        "trainees/",
        TraineeApplicationCreateView.as_view(),
        name="trainee-application-create",
    ),
    path(
        "job-seekers/",
        JobSeekerApplicationCreateView.as_view(),
        name="jobseeker-application-create",
    ),
]
