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
        ("main_facility", "المنشأة الرئيسية"),  # Translated
        ("branch_facility", "المنشأة الفرعية"),  # Translated
        ("modify_data", "تعديل البيانات"),  # Translated
    ]
    request_type = models.CharField(
        max_length=50,
        choices=REQUEST_TYPE_CHOICES,
        help_text="نوع طلب الخدمة (مثال: المنشأة الرئيسية, المنشأة الفرعية, تعديل البيانات).",  # Translated
    )

    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)  # Allows for international formats
    company_profile = models.TextField(
        blank=True,
        null=True,
        max_length=2000,
        help_text="اختياري: وصف موجز لملف تعريف الشركة.",  # Translated
    )
    agreement = models.BooleanField(
        default=False,
        help_text="يشير إلى ما إذا كان المستخدم قد وافق على الشروط والأحكام.",  # Translated
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
        help_text="اختياري: قم بتحميل التراخيص ذات الصلة (PDF, DOCX, PNG, JPG, JPEG).",  # Translated
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
        help_text="اختياري: قم بتحميل المستندات المتعلقة بالمديرين (PDF, DOCX, PNG, JPG, JPEG).",  # Translated
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
        help_text="اختياري مشروط: الميزانية العمومية (PDF, DOCX, PNG, JPG, JPEG).",  # Translated
    )

    STATUS_CHOICES = [
        ("pending_review", "قيد المراجعة"),  # Translated
        ("approved", "تمت الموافقة"),  # Translated
        ("rejected", "مرفوض"),  # Translated
    ]
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="pending_review",
        editable=False,  # Status changes should be managed internally/by admins
        help_text="الحالة الحالية لطلب الخدمة.",  # Translated
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
        # Using get_request_type_display() to show the translated choice value
        return f"طلب خدمة {self.id} لـ {self.company_name} ({self.get_request_type_display()})"  # Translated

    class Meta:
        verbose_name = "طلب خدمة"  # Translated
        verbose_name_plural = "طلبات الخدمة"  # Translated
        ordering = ["-created_at"]
