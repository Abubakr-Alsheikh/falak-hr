import secrets  # Used for generating random ID string
from django.db import models
from django.core.validators import FileExtensionValidator


class ServiceRequest(models.Model):
    """
    Represents a service request submitted by a user.
    Handles various request types and file uploads.
    """

    # Custom ID as primary key matching the requested example format (e.g., req_a1b2c3d4e5f6)
    # secrets.token_hex(6) generates 12 hex characters. 'req_' adds 4 more. Total 16 characters.
    id = models.CharField(primary_key=True, max_length=20, editable=False)

    REQUEST_TYPE_CHOICES = [
        ("main_facility", "Main Facility"),
        ("branch_facility", "Branch Facility"),
        ("modify_data", "Modify Data"),
    ]
    request_type = models.CharField(
        max_length=50,
        choices=REQUEST_TYPE_CHOICES,
        help_text="Type of service request (e.g., main_facility, branch_facility, modify_data).",
    )

    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)  # Allows for international formats
    company_profile = models.TextField(
        blank=True,
        null=True,
        max_length=2000,
        help_text="Optional: Brief description of the company profile.",
    )
    agreement = models.BooleanField(
        default=False,
        help_text="Indicates if the user has agreed to terms and conditions.",
    )

    # File fields: upload_to defines the subdirectory within MEDIA_ROOT
    # FileExtensionValidator provides basic security and type enforcement at the model level
    licenses = models.FileField(
        upload_to="service_requests/licenses/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["pdf", "docx", "png", "jpg", "jpeg"]
            )
        ],
        help_text="Optional: Upload relevant licenses (PDF, DOCX, PNG, JPG, JPEG).",
    )
    managers = models.FileField(
        upload_to="service_requests/managers/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["pdf", "docx", "png", "jpg", "jpeg"]
            )
        ],
        help_text="Optional: Upload documents related to managers (PDF, DOCX, PNG, JPG, JPEG).",
    )
    balance = models.FileField(
        upload_to="service_requests/balance/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["pdf", "docx", "png", "jpg", "jpeg"]
            )
        ],
        help_text="Conditionally Optional: Balance sheet (PDF, DOCX, PNG, JPG, JPEG).",
    )

    STATUS_CHOICES = [
        ("pending_review", "Pending Review"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="pending_review",
        editable=False,  # Status changes should be managed internally/by admins
        help_text="Current status of the service request.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Generate a custom ID if it's a new object (not yet saved)
        if not self.pk:  # Check if primary key exists (i.e., if it's a new instance)
            # Generate a 12-character hexadecimal string
            self.id = f"req_{secrets.token_hex(6)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Service Request {self.id} for {self.company_name} ({self.request_type})"
        )

    class Meta:
        verbose_name = "Service Request"
        verbose_name_plural = "Service Requests"
        ordering = ["-created_at"]
