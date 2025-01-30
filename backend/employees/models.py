from django.db import models
from django.contrib.auth.models import User
from companies.models import Company # Import Company model

class Employee(models.Model):
    USER_ROLES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, related_name='employees', on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=USER_ROLES, default='employee')
    phone_number = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.company.name}"