import re
from rest_framework import serializers
from .models import ServiceRequest

# Define max file size (e.g., 5MB) for all uploaded files
MAX_FILE_SIZE_MB = 5
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024


class ServiceRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and retrieving ServiceRequest instances.
    Handles multipart/form-data, custom validation, and field mapping.
    """

    # Map frontend camelCase field names to backend snake_case model fields
    requestType = serializers.CharField(source="request_type", required=True)
    companyName = serializers.CharField(
        source="company_name", max_length=255, required=True
    )
    contactPerson = serializers.CharField(
        source="contact_person", max_length=255, required=True
    )
    companyProfile = serializers.CharField(
        source="company_profile", allow_blank=True, required=False, max_length=2000
    )
    agreement = serializers.CharField(required=True, write_only=True)

    # --- New Serializer Fields ---
    serviceTitle = serializers.CharField(
        source="service_title", max_length=255, required=False, allow_blank=True
    )
    serviceDescription = serializers.CharField(
        source="service_description", required=False, allow_blank=True
    )
    # --- End New Serializer Fields ---

    licenses = serializers.FileField(required=False, allow_empty_file=True)
    managers = serializers.FileField(required=False, allow_empty_file=True)
    balance = serializers.FileField(required=False, allow_empty_file=True)

    class Meta:
        model = ServiceRequest
        fields = [
            "id",
            "requestType",
            "companyName",
            "contactPerson",
            "email",
            "phone",
            "companyProfile",
            # --- Add new fields to Meta.fields ---
            "serviceTitle",
            "serviceDescription",
            # --- End new fields ---
            "agreement",
            "licenses",
            "managers",
            "balance",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "created_at",
            "updated_at",
        ]

    def validate_requestType(self, value):
        allowed_choices = [choice[0] for choice in ServiceRequest.REQUEST_TYPE_CHOICES]
        if value not in allowed_choices:
            raise serializers.ValidationError(
                f"نوع الطلب '{value}' غير صالح. يجب أن يكون أحد الأنواع التالية: {', '.join(allowed_choices)}."
            )
        return value

    def validate_phone(self, value):
        if not re.fullmatch(r"^\+?[0-9\s-]{7,20}$", value):
            raise serializers.ValidationError("الرجاء إدخال تنسيق رقم هاتف صحيح.")
        return value

    def validate_agreement(self, value):
        if str(value).lower() != "true":
            raise serializers.ValidationError(
                "يجب الموافقة على الشروط والأحكام بتعيين 'agreement' إلى 'true'."
            )
        return True

    def _validate_file_common(self, file, field_name, allowed_extensions):
        if not file:
            return None

        if file.size > MAX_FILE_SIZE_BYTES:
            raise serializers.ValidationError(
                f"حجم ملف {field_name} ({file.size / (1024*1024):.2f} ميجابايت) "
                f"يتجاوز الحد الأقصى المسموح به وهو {MAX_FILE_SIZE_MB} ميجابايت."
            )

        file_extension = file.name.split(".")[-1].lower()
        if file_extension not in allowed_extensions:
            raise serializers.ValidationError(
                f"نوع الملف غير صالح لـ {field_name}. "
                f"الأنواع المسموح بها هي: {', '.join(allowed_extensions)}."
            )
        return file

    def validate_licenses(self, file):
        return self._validate_file_common(
            file, "التراخيص", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate_managers(self, file):
        return self._validate_file_common(
            file, "المديرين", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate_balance(self, file):
        return self._validate_file_common(
            file, "الميزانية العمومية", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate(self, data):
        request_type = data.get("request_type")
        balance_file = data.get("balance")

        main_facility_display = dict(ServiceRequest.REQUEST_TYPE_CHOICES)[
            "main_facility"
        ]
        branch_facility_display = dict(ServiceRequest.REQUEST_TYPE_CHOICES)[
            "branch_facility"
        ]

        if request_type in ["main_facility", "branch_facility"] and not balance_file:
            raise serializers.ValidationError(
                {
                    "balance": f"ملف 'الميزانية العمومية' مطلوب لأنواع طلبات '{main_facility_display}' و '{branch_facility_display}'."
                }
            )

        return data

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        request = self.context.get("request")
        if request:
            for model_field_name in ["licenses", "managers", "balance"]:
                file_obj = getattr(instance, model_field_name, None)
                if file_obj and hasattr(file_obj, "url"):
                    ret[model_field_name] = request.build_absolute_uri(file_obj.url)
                else:
                    ret[model_field_name] = None

        ret.pop("agreement", None)

        return ret
