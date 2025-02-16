from rest_framework import viewsets, status
from rest_framework.response import Response

from employees.permissions import IsAdminOrManagerOrSelf
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.filters import SearchFilter

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAdminOrManagerOrSelf]
    filter_backends = [SearchFilter]
    search_fields = ['user__username', 'user__email', 'job_title', 'department'] 

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)