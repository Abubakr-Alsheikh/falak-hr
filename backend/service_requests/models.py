# backend/service_requests/models.py
import secrets
from django.db import models
from django.core.validators import FileExtensionValidator


class ServiceRequest(models.Model):
    """
    Represents a service request submitted by a user.
    Handles various request types and file uploads.
    """

    id = models.CharField(primary_key=True, max_length=20, editable=False)

    REQUEST_TYPE_CHOICES = [
        ("main_facility", "المنشأة الرئيسية"),
        ("branch_facility", "المنشأة الفرعية"),
        ("modify_data", "تعديل البيانات"),
    ]
    request_type = models.CharField(
        max_length=50,
        choices=REQUEST_TYPE_CHOICES,
        help_text="نوع طلب الخدمة (مثال: المنشأة الرئيسية, المنشأة الفرعية, تعديل البيانات).",
    )

    company_name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company_profile = models.TextField(
        blank=True,
        null=True,
        max_length=2000,
        help_text="اختياري: وصف موجز لملف تعريف الشركة.",
    )
    agreement = models.BooleanField(
        default=False,
        help_text="يشير إلى ما إذا كان المستخدم قد وافق على الشروط والأحكام.",
    )

    # --- New Fields Added ---
    service_title = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="اختياري: عنوان الخدمة التي تم اختيارها من بطاقة الخدمة.",  # Translated
    )
    service_description = models.TextField(
        blank=True,
        null=True,
        help_text="اختياري: وصف الخدمة التي تم اختيارها من بطاقة الخدمة.",  # Translated
    )
    # --- End New Fields ---

    licenses = models.FileField(
        upload_to="service_requests/licenses/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["pdf", "docx", "png", "jpg", "jpeg"]
            )
        ],
        help_text="اختياري: قم بتحميل التراخيص ذات الصلة (PDF, DOCX, PNG, JPG, JPEG).",
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
        help_text="اختياري: قم بتحميل المستندات المتعلقة بالمديرين (PDF, DOCX, PNG, JPG, JPEG).",
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
        help_text="اختياري مشروط: الميزانية العمومية (PDF, DOCX, PNG, JPG, JPEG).",
    )

    STATUS_CHOICES = [
        ("pending_review", "قيد المراجعة"),
        ("approved", "تمت الموافقة"),
        ("rejected", "مرفوض"),
    ]
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="pending_review",
        editable=False,
        help_text="الحالة الحالية لطلب الخدمة.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.id = f"req_{secrets.token_hex(6)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"طلب خدمة {self.id} لـ {self.company_name} ({self.get_request_type_display()})"

    class Meta:
        verbose_name = "طلب خدمة"
        verbose_name_plural = "طلبات الخدمة"
        ordering = ["-created_at"]
