# backend/tasks/permissions.py
from rest_framework import permissions
from users.models import UserProfile

class IsAdminOrManagerOrAssignedEmployee(permissions.BasePermission):
    """
    Allows access to:
    - Admins and Managers (of the project's company).
    - Employees assigned to the task.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile
            return user_profile.role in ['admin', 'manager', 'employee']  # Employee is allowed at the view level
        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile
            # Admins/Managers of the *project's company* can access
            if user_profile.role in ['admin', 'manager'] and user_profile.company_id == obj.project.company_id:
                return True
            # Employees assigned to the task can access
            if user_profile.role == 'employee':
                return user_profile in obj.assigned_to.all()
            return False
        except UserProfile.DoesNotExist:
            return False