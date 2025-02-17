from rest_framework import permissions
from .models import UserProfile

class IsAdminOrManagerOrSelf(permissions.BasePermission):
    """
    Custom permission to allow:
    - Admins and Managers to access all user profiles.
    - Employees to access only their own user profile.
    """
    def has_permission(self, request, view):
        """
        Checks if the user has general permission to access the view.
        """
        if not request.user or not request.user.is_authenticated:
            return False  # Not authenticated, no access
        try:
            user_profile = request.user.userprofile  # Get the UserProfile
            # All authenticated users (admin, manager, employee) can access user endpoints.
            return user_profile.role in ['admin', 'manager', 'employee']
        except UserProfile.DoesNotExist:
            return False  # UserProfile doesn't exist, deny access

    def has_object_permission(self, request, view, obj):
        """
        Checks if the user has permission to access a specific UserProfile object.
        """
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile
            if user_profile.role in ['admin', 'manager']:
                return True  # Admin and Managers can access any user profile
            if user_profile.role == 'employee':
                return obj == user_profile  # Employees can only access their own profile
            return False
        except UserProfile.DoesNotExist:
            return False