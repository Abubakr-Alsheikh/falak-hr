# backend/service_requests/admin.py

from django.contrib import admin
from .models import ServiceRequest


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    """
    Admin configuration for the ServiceRequest model.
    Provides comprehensive listing, filtering, searching, and detail views.
    """

    # Fields to display in the list view of the admin interface
    list_display = (
        "id",
        "company_name",
        "request_type",
        "contact_person",
        "email",
        "phone",
        "status",
        "created_at",
    )

    # Fields that can be used for searching in the admin list view
    search_fields = (
        "id",
        "company_name",
        "contact_person",
        "email",
        "phone",
        "request_type",
        "status",
    )

    # Fields to filter by in the admin list view sidebar
    list_filter = (
        "request_type",
        "status",
        "created_at",
    )

    # Fields that are read-only in the admin detail view (cannot be edited by admin)
    # The 'id', 'status', 'created_at', 'updated_at' are typically auto-managed or fixed.
    readonly_fields = (
        "id",
        "status",  # Status changes might be handled via custom admin actions or workflows, not direct edit.
        "created_at",
        "updated_at",
        "licenses",  # These are file fields, often viewed/downloaded rather than re-uploaded from admin.
        "managers",
        "balance",
    )

    # Order of fields in the detail view
    # You can group them into fieldsets for better organization if the model has many fields.
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "request_type",
                    "company_name",
                    "contact_person",
                    "email",
                    "phone",
                    "company_profile",
                    "agreement",  # Agreement status
                )
            },
        ),
        (
            "Documents",
            {
                "fields": (
                    "licenses",
                    "managers",
                    "balance",
                ),
                "description": "Attached files for this request.",
            },
        ),
        (
            "Status & Timestamps",
            {
                "fields": (
                    "status",
                    "created_at",
                    "updated_at",
                ),
                "classes": ("collapse",),  # Makes this section collapsible
            },
        ),
    )

    # If you want to disable adding/deleting directly from the admin for this model
    # def has_add_permission(self, request):
    #     return False
    # def has_delete_permission(self, request, obj=None):
    #     return False
