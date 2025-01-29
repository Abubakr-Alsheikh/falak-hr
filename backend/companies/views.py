from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .permissions import IsAdminUserOrReadOnly
from .models import Company
from .serializers import CompanySerializer
from employees.serializers import EmployeeSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUserOrReadOnly]

    @action(detail=True, methods=['get'])
    def subcompanies(self, request, pk=None):
        company = self.get_object()
        sub_companies = company.sub_companies.all()
        serializer = CompanySerializer(sub_companies, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def employees(self, request, pk=None):
        company = self.get_object()
        employees = company.employees.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)