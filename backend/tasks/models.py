from django.db import models
from companies.models import Company
from users.models import UserProfile  # Use UserProfile

class Task(models.Model):
    """
    Represents a task, assigned to users within a company.
    """
    STATUS_CHOICES = [
        ('to_do', 'To Do'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]
    company = models.ForeignKey(Company, related_name='tasks', on_delete=models.CASCADE)
    assigned_to = models.ManyToManyField(UserProfile, related_name='tasks')  # Use UserProfile
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='to_do')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title