from rest_framework import permissions
from users.models import UserProfile  # Import UserProfile, not Employee

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Allows admin users full access.  Read-only for authenticated users.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:  # GET, HEAD, OPTIONS
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff  # is_staff for Django admin

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Read permissions allowed
        return request.user and request.user.is_staff

class IsAdminOrManager(permissions.BasePermission):
    """
    Allows access to admin and manager users.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        try:
            user_profile = request.user.userprofile  # Use userprofile
            return user_profile.role in ['admin', 'manager']
        except UserProfile.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)  # Same object-level permission