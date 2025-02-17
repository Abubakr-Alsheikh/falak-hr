from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the built-in Django User model.  Handles password hashing.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Password is write-only

    def create(self, validated_data):
        """
        Creates a new User instance, hashing the password.
        """
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.  Includes nested User serialization.
    """
    user = UserSerializer()  # Nested User serializer
    company_name = serializers.SerializerMethodField()  # Read-only company name

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'company', 'company_name', 'role', 'phone_number', 'department', 'job_title', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'company_name', 'created_at', 'updated_at']

    def get_company_name(self, obj):
        """
        Returns the company name.
        """
        return obj.company.name if obj.company else None

    def create(self, validated_data):
        """
        Creates a new UserProfile instance, along with the associated User.
        """
        user_data = validated_data.pop('user')  # Extract user data
        user = User.objects.create_user(**user_data)  # Create the User
        user_profile = UserProfile.objects.create(user=user, **validated_data)  # Create the UserProfile
        return user_profile

    def update(self, instance, validated_data):
        """
        Updates an existing UserProfile instance, handling nested User updates.
        """
        if 'user' in validated_data:
            user_data = validated_data.pop('user')
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True) # Allow partial user updates
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        return super().update(instance, validated_data)  # Update the UserProfile