# backend/service_requests/views.py
import logging
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django.template.loader import render_to_string
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

# Import both permission classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import ServiceRequest
from .serializers import ServiceRequestSerializer

# Get an instance of a logger
logger = logging.getLogger(__name__)


class ServiceRequestViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and creating ServiceRequest instances.
    Provides 'list' (GET /api/service-requests),
    'create' (POST /api/service-requests),
    and 'retrieve' (GET /api/service-requests/{id}) actions.
    """

    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    parser_classes = [MultiPartParser, FormParser]

    # Default permission: By default, assume all actions require authentication.
    # This is overridden by get_permissions for specific actions.
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that the view requires.
        Allows unauthenticated users to create (POST) a service request,
        but requires authentication for all other actions (GET list, GET retrieve, etc.).
        """
        if self.action == "create":
            # For the 'create' action (POST), allow any user (authenticated or not).
            permission_classes = [AllowAny]
        else:
            # For all other actions (list, retrieve, update, destroy), require authentication.
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        """
        Handles the POST request to create a ServiceRequest.
        Customizes success and error responses to match the specification.
        Includes email sending upon successful creation.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            # --- Email Sending Logic ---
            service_request_instance = serializer.instance
            user_email = service_request_instance.email
            company_email = settings.EMAIL_HOST_USER

            def get_file_url(file_field):
                if file_field and hasattr(file_field, "url"):
                    return request.build_absolute_uri(file_field.url)
                return "N/A"

            email_context = {
                "id": service_request_instance.id,
                "requestType": service_request_instance.get_request_type_display(),  # This will be in Arabic if choices are translated
                "companyName": service_request_instance.company_name,
                "contactPerson": service_request_instance.contact_person,
                "email": user_email,
                "phone": service_request_instance.phone,
                "companyProfile": service_request_instance.company_profile or "N/A",
                "licenses_url": get_file_url(service_request_instance.licenses),
                "managers_url": get_file_url(service_request_instance.managers),
                "balance_url": get_file_url(service_request_instance.balance),
                "status": service_request_instance.get_status_display(),  # This will be in Arabic if choices are translated
                "created_at": service_request_instance.created_at.strftime(
                    "%Y-%m-%d %H:%M:%S UTC"
                ),
            }

            try:
                # --- Language Selection Logic (forcing Arabic for demonstration) ---
                # In a real application, this would typically come from request headers (Accept-Language)
                # or a user preference setting.
                lang_suffix = "_ar"  # Forces Arabic templates to be used

                # 1. Send Email to Company (admin-facing, can be English or Arabic based on preference)
                # Keeping this in English for typical admin clarity, but you could add an _ar template
                # and logic to select based on admin's preferred language.
                company_subject = f"تم استلام طلب خدمة جديد: {email_context['requestType']} من {email_context['companyName']}"
                company_message_plain = render_to_string(
                    f"emails/company_service_request_notification{lang_suffix}.txt",  # Ensure this template exists
                    email_context,
                )
                company_message_html = render_to_string(
                    f"emails/company_service_request_notification{lang_suffix}.html",  # Ensure this template exists
                    email_context,
                )

                send_mail(
                    company_subject,
                    company_message_plain,
                    company_email,
                    [company_email],
                    html_message=company_message_html,
                    fail_silently=False,
                )
                logger.info(
                    f"Email sent to company ({company_email}) for service request {service_request_instance.id}."
                )

                # 2. Send Email to User (translated to Arabic as requested)
                user_subject = (
                    f"تم إرسال طلب خدمتك رقم #{email_context['id']}"  # Translated
                )
                user_message_plain = render_to_string(
                    f"emails/user_service_request_confirmation{lang_suffix}.txt",  # Ensure this template exists
                    email_context,
                )
                user_message_html = render_to_string(
                    f"emails/user_service_request_confirmation{lang_suffix}.html",  # Ensure this template exists
                    email_context,
                )

                send_mail(
                    user_subject,
                    user_message_plain,
                    company_email,
                    [user_email],
                    html_message=user_message_html,
                    fail_silently=False,
                )
                logger.info(
                    f"Email sent to user ({user_email}) for service request {service_request_instance.id}."
                )

            except BadHeaderError:
                logger.error(
                    f"Invalid email header found when sending email for service request {service_request_instance.id}."
                )
            except Exception as email_error:
                logger.error(
                    f"Failed to send email for service request {service_request_instance.id}: {email_error}",
                    exc_info=True,
                )

            # --- SUCCESS Response (201 Created) ---
            return Response(
                {
                    "id": service_request_instance.id,
                    "status": service_request_instance.status,
                    "message": "تم إرسال طلب الخدمة بنجاح. تم إرسال بريد إلكتروني للتأكيد.",  # Translated
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        except ValidationError as e:
            # --- CLIENT-SIDE ERROR Response (400 Bad Request) ---
            formatted_errors = {}
            for field, messages in e.detail.items():
                if isinstance(messages, list) and messages:
                    formatted_errors[field] = messages[0]
                else:
                    formatted_errors[field] = str(messages)

            return Response(
                {
                    "message": "البيانات المدخلة غير صالحة.",
                    "errors": formatted_errors,
                },  # Translated
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            # --- SERVER-SIDE ERROR Response (500 Internal Server Error) ---
            logger.exception(
                f"An unexpected server error occurred during service request creation: {e}"
            )
            return Response(
                {
                    "message": "حدث خطأ غير متوقع في الخادم. الرجاء المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم."  # Translated
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
