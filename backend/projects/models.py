# backend/projects/models.py
from django.db import models
from companies.models import Company
from users.models import UserProfile

class Project(models.Model):
    """
    Represents a project within a company.
    """
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]

    company = models.ForeignKey(Company, related_name='projects', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)  # Planned end date
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    manager = models.ForeignKey(UserProfile, related_name='managed_projects', on_delete=models.SET_NULL, null=True, blank=True) # Project Manager
    team_members = models.ManyToManyField(UserProfile, related_name='projects', blank=True) # Team members assigned to project
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name