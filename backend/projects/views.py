# backend/projects/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import IsAuthenticated  # Import IsAuthenticated

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projects to be viewed or edited.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # permission_classes = [IsAuthenticated]  # Add authentication

    def get_queryset(self):
        """
        Optionally restricts the returned projects to a given company,
        by filtering against a `company` query parameter in the URL.
        """
        queryset = super().get_queryset()
        company_id = self.request.query_params.get('company')
        if company_id is not None:
            queryset = queryset.filter(company_id=company_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Ensure user is part of the company (additional security check)
        if request.user.userprofile.company_id != serializer.validated_data['company'].id:
            return Response({"detail": "You are not authorized to create projects for this company."}, status=status.HTTP_403_FORBIDDEN)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
      serializer.save()


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Ensure user is part of the company or is a manager of the project
        if request.user.userprofile.company_id != instance.company_id and request.user.userprofile != instance.manager:
          return Response({"detail": "You are not authorized to update this project."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Ensure user is part of the company or is a manager
        if request.user.userprofile.company_id != instance.company_id and request.user.userprofile != instance.manager:
            return Response({"detail": "You are not authorized to delete this project."}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    def perform_destroy(self, instance):
      instance.delete()