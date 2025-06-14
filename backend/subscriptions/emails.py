# backend/subscriptions/emails.py
import logging
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from .models import TrainerApplication, TraineeApplication, JobSeekerApplication

# A mapping from model class to a user-friendly name in Arabic
APPLICATION_TYPE_MAPPING = {
    TrainerApplication: "مدرب",
    TraineeApplication: "متدرب",
    JobSeekerApplication: "باحث عن عمل",
}

# Get an instance of a logger
logger = logging.getLogger(__name__)


def send_application_notification_emails(instance):
    """
    A dedicated function to send email notifications for a new application.
    This is called directly from the ViewSet after successful object creation.
    """
    # Ensure we have an admin email configured to send to.
    admin_email = getattr(settings, "EMAIL_HOST_USER", None)
    if not admin_email and not settings.DEBUG:
        logger.error(
            "EMAIL_HOST_USER is not configured in settings. Cannot send admin notification."
        )
        return

    sender_class = instance.__class__
    application_type_name = APPLICATION_TYPE_MAPPING.get(sender_class, "غير معروف")
    user_email = instance.email
    applicant_name = instance.fullName

    # Prepare the context dictionary to render templates
    application_data = {
        field.verbose_name: getattr(instance, field.name)
        for field in instance._meta.fields
        if field.name not in ["id"]
    }

    context = {
        "applicant_name": applicant_name,
        "application_type": application_type_name,
        "application_data": application_data,
    }

    # --- 1. Send Email to Admin ---
    try:
        admin_subject = f"طلب جديد: {application_type_name} - {applicant_name}"
        admin_html_content = render_to_string(
            "emails/subscription/admin_notification.html", context
        )
        admin_text_content = f"تم استلام طلب {application_type_name} جديد من {applicant_name} ({user_email})."

        msg_admin = EmailMultiAlternatives(
            admin_subject, admin_text_content, settings.EMAIL_HOST_USER, [admin_email]
        )
        msg_admin.attach_alternative(admin_html_content, "text/html")
        msg_admin.send()
        logger.info(
            f"Admin notification sent successfully for application {instance.id}"
        )

    except Exception as e:
        logger.error(
            f"Failed to send admin notification for application {instance.id}: {e}"
        )

    # --- 2. Send Confirmation Email to User ---
    try:
        user_subject = "تم استلام طلبك بنجاح - فلك للموارد البشرية"
        user_html_content = render_to_string(
            "emails/subscription/user_confirmation.html", context
        )
        user_text_content = (
            f"مرحباً {applicant_name}، شكراً لتقديم طلبك. سنقوم بمراجعته قريباً."
        )

        msg_user = EmailMultiAlternatives(
            user_subject, user_text_content, settings.EMAIL_HOST_USER, [user_email]
        )
        msg_user.attach_alternative(user_html_content, "text/html")
        msg_user.send()
        logger.info(
            f"User confirmation sent successfully for application {instance.id}"
        )

    except Exception as e:
        logger.error(
            f"Failed to send user confirmation for application {instance.id}: {e}"
        )
