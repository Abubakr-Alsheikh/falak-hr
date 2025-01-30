from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_names = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'due_date', 'company', 'company_name', 'assigned_to', 'assigned_to_names', 'created_at', 'updated_at']
        read_only_fields = ['id', 'company_name', 'assigned_to_names', 'created_at', 'updated_at']

    def get_assigned_to_names(self, obj):
        return [employee.user.username for employee in obj.assigned_to.all()]

    def get_company_name(self, obj):
        return obj.company.name if obj.company else None