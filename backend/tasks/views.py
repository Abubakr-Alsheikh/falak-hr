from rest_framework import viewsets, permissions

from tasks.permissions import IsAdminOrManagerOrAssignedEmployee
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrManagerOrAssignedEmployee]