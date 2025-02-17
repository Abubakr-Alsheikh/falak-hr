from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    sub_companies = serializers.SerializerMethodField()
    employee_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ['id', 'name', 'parent_company', 'sub_companies', 'employee_count', 'address', 'contact_email', 'contact_phone', 'created_at', 'updated_at']
        read_only_fields = ['id', 'sub_companies', 'employee_count', 'created_at', 'updated_at']

    def get_sub_companies(self, obj):
        serializer = CompanySerializer(obj.sub_companies.all(), many=True, read_only=True)
        return serializer.data

    def get_employee_count(self, obj):
        return obj.users.count()