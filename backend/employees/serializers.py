from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee
from companies.serializers import CompanySerializer # Import CompanySerializer (if needed for nested serialization)


class UserSerializer(serializers.ModelSerializer): # For nested User in Employee
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password'] # Include password for creation, handle carefully
        extra_kwargs = {'password': {'write_only': True}} # Password only for writing, not in response

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password']) # Hash password
        user.save()
        return user

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'user', 'company', 'company_name', 'role', 'phone_number', 'department', 'job_title', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'company_name', 'created_at', 'updated_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'email': obj.user.email,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
        }

    def get_company_name(self, obj):
        return obj.company.name if obj.company else None

    def create(self, validated_data):
        user_data = validated_data.pop('user') # Assuming you are passing user details in request
        user = User.objects.create_user(**user_data) # Create Django User
        employee = Employee.objects.create(user=user, **validated_data) # Create Employee
        return employee

    def update(self, instance, validated_data):
        if 'user' in validated_data:
            user_data = validated_data.pop('user')
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True) # Partial update
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        return super().update(instance, validated_data)

