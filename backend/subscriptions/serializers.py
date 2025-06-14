from rest_framework import serializers
from .models import TrainerApplication, TraineeApplication, JobSeekerApplication


class TrainerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerApplication
        # Exclude read-only fields from the input, but include them in the output
        fields = "__all__"
        read_only_fields = ("created_at",)


class TraineeApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TraineeApplication
        fields = "__all__"
        read_only_fields = ("created_at",)


class JobSeekerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerApplication
        fields = "__all__"
        read_only_fields = ("created_at",)
