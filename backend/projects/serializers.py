# backend/projects/serializers.py
from rest_framework import serializers
from .models import Project
from users.serializers import UserProfileSerializer  # Import UserProfileSerializer

class ProjectSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    manager_name = serializers.SerializerMethodField()
    team_members_details = UserProfileSerializer(source='team_members', many=True, read_only=True) # nested serializer for team members

    class Meta:
        model = Project
        fields = [
            'id', 'company', 'company_name', 'name', 'description',
            'start_date', 'end_date', 'status', 'manager', 'manager_name',
            'team_members', 'team_members_details', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'company_name', 'manager_name', 'created_at', 'updated_at', 'team_members_details']

    def get_company_name(self, obj):
        return obj.company.name if obj.company else None

    def get_manager_name(self, obj):
        return obj.manager.user.username if obj.manager else None