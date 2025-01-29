from rest_framework import permissions

from employees.models import Employee

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Allows admin users full access. Read-only access for other authenticated users.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS: # SAFE_METHODS are GET, HEAD, OPTIONS
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff # is_staff is Django's admin user flag

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True # Read permissions are allowed to any request
        return request.user and request.user.is_staff # Only admin can modify

class IsAdminOrManager(permissions.BasePermission):
    """
    Allows admin and manager users.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            employee = request.user.employee # Assuming Employee model is linked to User via OneToOneField
            return employee.role in ['admin', 'manager']
        except Employee.DoesNotExist:
            return False # If no Employee profile, deny access

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view) # Object level permission same as general permission for now