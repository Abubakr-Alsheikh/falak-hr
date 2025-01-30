from rest_framework import permissions
from employees.models import Employee

class IsAdminOrManagerOrAssignedEmployee(permissions.BasePermission):
    """
    Allows admin, managers, and employees assigned to the task to access it.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            employee = request.user.employee
            return employee.role in ['admin', 'manager', 'employee'] # All roles can potentially access tasks
        except Employee.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_employee = request.user.employee
            if user_employee.role in ['admin', 'manager']:
                return True # Admins and Managers can access any task
            if user_employee.role == 'employee':
                return user_employee in obj.assigned_to.all() # Employee can access only assigned tasks
            return False
        except Employee.DoesNotExist:
            return False