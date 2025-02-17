from rest_framework import serializers
from .models import Task
from projects.serializers import ProjectSerializer


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_names = serializers.SerializerMethodField()
    company_name = serializers.CharField(source="project.company.name", read_only=True)
    project_details = ProjectSerializer(source="project", read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "status",
            "due_date",
            "project",
            "project_details",
            "company_name",
            "assigned_to",
            "assigned_to_names",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "company_name",
            "assigned_to_names",
            "project_details",
            "created_at",
            "updated_at",
        ]

    def get_assigned_to_names(self, obj):
        return [employee.user.username for employee in obj.assigned_to.all()]
