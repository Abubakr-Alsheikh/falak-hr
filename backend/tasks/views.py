from rest_framework import viewsets

from tasks.permissions import IsAdminOrManagerOrAssignedEmployee
from .models import Task
from .serializers import TaskSerializer
from rest_framework.filters import OrderingFilter

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrManagerOrAssignedEmployee]
    filter_backends = [OrderingFilter]
    ordering_fields = ['title', 'due_date', 'status', 'created_at'] # Fields you can order by
    ordering = ['-created_at']