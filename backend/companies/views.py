from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from employees.serializers import EmployeeSerializer
from .permissions import IsAdminUserOrReadOnly
from .models import Company
from .serializers import CompanySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['contact_email'] # Example filter field

    search_fields = ['name__icontains', 'address__icontains', 'contact_email__icontains', 'contact_phone__icontains'] # Use icontains for partial matching
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

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