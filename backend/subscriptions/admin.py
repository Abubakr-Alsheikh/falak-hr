from django.contrib import admin
from .models import TrainerApplication, TraineeApplication, JobSeekerApplication


@admin.register(TrainerApplication)
class TrainerApplicationAdmin(admin.ModelAdmin):
    list_display = ("fullName", "email", "cityRegion", "specialization", "created_at")
    list_filter = ("created_at", "cityRegion", "nationality")
    search_fields = ("fullName", "email", "specialization")


@admin.register(TraineeApplication)
class TraineeApplicationAdmin(admin.ModelAdmin):
    list_display = ("fullName", "email", "nationality", "created_at")
    list_filter = ("created_at", "nationality")
    search_fields = ("fullName", "email")


@admin.register(JobSeekerApplication)
class JobSeekerApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "fullName",
        "email",
        "specialization",
        "yearsOfExperience",
        "created_at",
    )
    list_filter = ("created_at", "cityRegion", "yearsOfExperience")
    search_fields = ("fullName", "email", "specialization")
