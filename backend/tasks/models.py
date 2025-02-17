from django.db import models
from users.models import UserProfile  # Use UserProfile
from projects.models import Project  # Import the Project Model


class Task(models.Model):
    """
    Represents a task, assigned to users, associated with a project.
    """

    STATUS_CHOICES = [
        ("to_do", "To Do"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("on_hold", "On Hold"),
    ]
    project = models.ForeignKey(
        Project, related_name="tasks", on_delete=models.SET_NULL, null=True, blank=True
    )
    assigned_to = models.ManyToManyField(UserProfile, related_name="tasks", blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="to_do")
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
