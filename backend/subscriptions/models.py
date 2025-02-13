from django.db import models


class SubscriptionRequest(models.Model):
    USER_TYPE_CHOICES = (
        ("employer", "صاحب عمل"),
        ("manager", "مدير"),
    )

    SUBSCRIPTION_TYPE_CHOICES = (
        ("basic", "أساسي"),
        ("silver", "فضي"),
        ("gold", "ذهبي"),
    )

    user_type = models.CharField(
        max_length=20, choices=USER_TYPE_CHOICES, verbose_name="نوع المستخدم"
    )
    subscription_type = models.CharField(
        max_length=20, choices=SUBSCRIPTION_TYPE_CHOICES, verbose_name="نوع الاشتراك"
    )
    # Personal info (you can add more like company_name in the next steps)
    first_name = models.CharField(max_length=255, verbose_name="الاسم الأول")
    last_name = models.CharField(max_length=255, verbose_name="اسم العائلة")
    email = models.EmailField(verbose_name="البريد الإلكتروني")
    phone_number = models.CharField(
        max_length=20, verbose_name="رقم الهاتف", blank=True, null=True
    )
    company_name = models.CharField(
        max_length=255, verbose_name="اسم الشركة", blank=True, null=True
    )
    message = models.TextField(
        verbose_name="الرسالة", blank=True, null=True
    )
    request_date = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الطلب")
    is_processed = models.BooleanField(
        default=False, verbose_name="تمت معالجته؟"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.get_user_type_display()} - {self.get_subscription_type_display()}"

    class Meta:
        verbose_name = "طلب اشتراك"
        verbose_name_plural = "طلبات الاشتراك"
