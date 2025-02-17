from rest_framework import permissions
from users.models import UserProfile  # Use UserProfile

class IsAdminOrManagerOrAssignedEmployee(permissions.BasePermission):
    """
    Allows access to:
    - Admins and Managers.
    - Employees assigned to the task.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile  # Use userprofile
            return user_profile.role in ['admin', 'manager', 'employee']
        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile
            if user_profile.role in ['admin', 'manager']:
                return True  # Admins/Managers can access any task
            if user_profile.role == 'employee':
                return user_profile in obj.assigned_to.all()  # Check if assigned
            return False
        except UserProfile.DoesNotExist:
            return False