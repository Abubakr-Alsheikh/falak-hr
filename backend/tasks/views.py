from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from rest_framework.filters import OrderingFilter
from .permissions import IsAdminOrManagerOrAssignedEmployee


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrManagerOrAssignedEmployee]
    filter_backends = [OrderingFilter]
    ordering_fields = ["title", "due_date", "status", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get("project")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if project is provided and user belongs to project's company
        if (
            "project" in serializer.validated_data
            and serializer.validated_data["project"]
        ):
            if (
                request.user.userprofile.company_id
                != serializer.validated_data["project"].company_id
            ):
                return Response(
                    {
                        "detail": "You are not authorized to create tasks for this project's company."
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"detail": "A project must be specified for the task."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        # Check if user belongs to the project's company
        if request.user.userprofile.company_id != instance.project.company_id:
            return Response(
                {
                    "detail": "You are not authorized to update tasks for this project's company."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Check if a new project is provided and user belongs to the new project's company
        if (
            "project" in serializer.validated_data
            and serializer.validated_data["project"]
        ):
            if (
                request.user.userprofile.company_id
                != serializer.validated_data["project"].company_id
            ):
                return Response(
                    {
                        "detail": "You are not authorized to move this task to a project in a different company."
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        self.perform_update(serializer)
        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if user belongs to the project's company
        if request.user.userprofile.company_id != instance.project.company_id:
            return Response(
                {
                    "detail": "You are not authorized to delete tasks for this projects company."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
