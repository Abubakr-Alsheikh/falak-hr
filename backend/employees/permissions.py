from rest_framework import permissions
from .models import Employee # Import Employee model

class IsAdminOrManagerOrSelf(permissions.BasePermission):
    """
    Allows admin, managers, and employees to access their own employee profile.
    Admin/Managers can access all.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            employee = request.user.employee
            return employee.role in ['admin', 'manager', 'employee'] # All authenticated employee roles can access employee endpoints
        except Employee.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_employee = request.user.employee
            if user_employee.role in ['admin', 'manager']:
                return True # Admin and Managers can access any employee object
            if user_employee.role == 'employee':
                return obj == user_employee # Employee can only access their own Employee object
            return False
        except Employee.DoesNotExist:
            return False