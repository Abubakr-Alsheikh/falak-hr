# backend/users/models.py
from django.db import models
from django.contrib.auth.models import User
from companies.models import Company

class UserProfile(models.Model):
    """
    Represents a user profile in the system, extending the built-in Django User model.
    """
    USER_ROLES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One-to-one link to Django's User
    company = models.ForeignKey(Company, related_name='users', on_delete=models.CASCADE)  # Link to the Company
    role = models.CharField(max_length=20, choices=USER_ROLES, default='employee')  # User's role
    phone_number = models.CharField(max_length=20, blank=True)  # Optional phone number
    department = models.CharField(max_length=100, blank=True)   # Optional department
    job_title = models.CharField(max_length=100, blank=True)     # Optional job title
    created_at = models.DateTimeField(auto_now_add=True)        # Automatically set on creation
    updated_at = models.DateTimeField(auto_now=True)            # Automatically updated on save

    def __str__(self):
        """
        Returns a string representation of the UserProfile.
        """
        return f"{self.user.username} - {self.company.name}"