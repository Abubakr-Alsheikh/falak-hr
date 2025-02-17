# backend/users/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from .models import UserProfile
from .serializers import UserProfileSerializer
from .permissions import IsAdminOrManagerOrSelf

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing UserProfile instances.  Provides CRUD operations.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAdminOrManagerOrSelf]
    filter_backends = [SearchFilter]  # Enable search filtering
    search_fields = ['user__username', 'user__email', 'job_title', 'department']

    def create(self, request, *args, **kwargs):
        """
        Handles POST requests to create a new UserProfile.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Validate input
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        """
        Handles PUT and PATCH requests to update a UserProfile.
        """
        partial = kwargs.pop('partial', False)  # Allow partial updates (PATCH)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)