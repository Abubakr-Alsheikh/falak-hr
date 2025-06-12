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
    # These are used for both input (write) and output (read).
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
    # agreement is write-only as it's only for input validation
    agreement = serializers.CharField(required=True, write_only=True)

    # File fields - allow them to be optional for input, but they will be URLs on output.
    # On input, these are the file objects. On output, they'll be URLs.
    # The `_validate_file_common` ensures they are handled.
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
            "agreement",  # write-only for POST
            "licenses",
            "managers",
            "balance",
            "status",  # Read-only, automatically handled by model
            "created_at",  # Read-only, automatically handled by model
            "updated_at",  # Read-only, automatically handled by model
        ]
        # Explicitly mark fields that are never set by the client
        read_only_fields = [
            "id",
            "status",
            "created_at",
            "updated_at",
            # agreement is write_only=True, which also makes it read-only
        ]

    def validate_requestType(self, value):
        allowed_choices = [choice[0] for choice in ServiceRequest.REQUEST_TYPE_CHOICES]
        if value not in allowed_choices:
            raise serializers.ValidationError(
                f"Invalid request type '{value}'. Must be one of: {', '.join(allowed_choices)}."
            )
        return value

    def validate_phone(self, value):
        if not re.fullmatch(r"^\+?[0-9\s-]{7,20}$", value):
            raise serializers.ValidationError(
                "Please enter a valid phone number format."
            )
        return value

    def validate_agreement(self, value):
        if str(value).lower() != "true":
            raise serializers.ValidationError(
                "You must agree to the terms and conditions by setting 'agreement' to 'true'."
            )
        return True

    def _validate_file_common(self, file, field_name, allowed_extensions):
        if not file:
            return None

        if file.size > MAX_FILE_SIZE_BYTES:
            raise serializers.ValidationError(
                f"{field_name} file size ({file.size / (1024*1024):.2f}MB) "
                f"exceeds the maximum allowed size of {MAX_FILE_SIZE_MB}MB."
            )

        file_extension = file.name.split(".")[-1].lower()
        if file_extension not in allowed_extensions:
            raise serializers.ValidationError(
                f"Invalid file type for {field_name}. "
                f"Allowed types are: {', '.join(allowed_extensions)}."
            )
        return file

    def validate_licenses(self, file):
        return self._validate_file_common(
            file, "Licenses", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate_managers(self, file):
        return self._validate_file_common(
            file, "Managers", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate_balance(self, file):
        return self._validate_file_common(
            file, "Balance", ["pdf", "docx", "png", "jpg", "jpeg"]
        )

    def validate(self, data):
        request_type = data.get("request_type")
        balance_file = data.get("balance")

        if request_type in ["main_facility", "branch_facility"] and not balance_file:
            raise serializers.ValidationError(
                {
                    "balance": "The 'balance' file is required for 'Main Facility' and 'Branch Facility' request types."
                }
            )

        return data

    def to_representation(self, instance):
        """
        Overrides to_representation to convert file paths to full URLs for GET requests
        and remove write-only fields.
        """
        ret = super().to_representation(instance)

        # Convert file paths to full URLs
        request = self.context.get("request")
        if request:
            # Iterate over model field names for files, not serializer field names
            for model_field_name in ["licenses", "managers", "balance"]:
                file_obj = getattr(instance, model_field_name, None)
                if file_obj and hasattr(file_obj, "url"):
                    # The `super().to_representation` already put the file field as its original name
                    # (e.g., 'licenses'). We just need to update its value to a full URL.
                    ret[model_field_name] = request.build_absolute_uri(file_obj.url)
                else:
                    ret[model_field_name] = None  # Ensure it's null if no file

        # Remove the 'agreement' field from output as it's write-only
        ret.pop("agreement", None)

        return ret
