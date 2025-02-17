from django.db import models

class Company(models.Model):
    """
    Represents a company, potentially with a parent-child relationship.
    """
    name = models.CharField(max_length=255, unique=True)
    parent_company = models.ForeignKey('self', null=True, blank=True, related_name='sub_companies', db_index=True, on_delete=models.SET_NULL)
    address = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name