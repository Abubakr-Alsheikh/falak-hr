from rest_framework import viewsets, pagination
from rest_framework.decorators import action
from rest_framework.response import Response

from employees.serializers import EmployeeSerializer
from .permissions import IsAdminUserOrReadOnly
from .models import Company
from .serializers import CompanySerializer
from rest_framework.filters import SearchFilter, OrderingFilter


class CompanyPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = [
        "name__icontains",
        "address__icontains",
        "contact_email__icontains",
        "contact_phone__icontains",
    ]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]
    pagination_class = CompanyPagination

    def get_queryset(self):
        return Company.objects.filter(parent_company__isnull=True)

    @action(detail=True, methods=["get"])
    def subcompanies(self, request, pk=None):
        company = self.get_object()
        sub_companies = company.sub_companies.all()
        serializer = CompanySerializer(sub_companies, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def employees(self, request, pk=None):
        company = self.get_object()
        employees = company.employees.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
