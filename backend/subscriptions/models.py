from django.db import models
from django.core.validators import MinValueValidator


class BaseApplication(models.Model):
    """
    An abstract base model containing common fields for all application forms.
    """

    fullName = models.CharField(max_length=255, verbose_name="الاسم الكامل")
    email = models.EmailField(verbose_name="البريد الإلكتروني")
    whatsappNumber = models.CharField(max_length=30, verbose_name="رقم الواتساب")
    ageCategory = models.CharField(max_length=100, verbose_name="الفئة العمرية")
    nationality = models.CharField(max_length=100, verbose_name="الجنسية")
    howHeard = models.CharField(max_length=255, verbose_name="كيف سمعت عنا")
    receiveNotifications = models.CharField(
        max_length=50, verbose_name="استلام الإشعارات"
    )
    inquiriesNotes = models.TextField(
        verbose_name="استفسارات وملاحظات", blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ التقديم")

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.fullName} ({self.email})"


class TrainerApplication(BaseApplication):
    cityRegion = models.CharField(max_length=100, verbose_name="المدينة/المنطقة")
    gender = models.CharField(max_length=50, verbose_name="الجنس")
    educationalDegree = models.CharField(max_length=100, verbose_name="الدرجة العلمية")
    registrationType = models.CharField(max_length=100, verbose_name="نوع التسجيل")
    specialization = models.CharField(max_length=255, verbose_name="التخصص")
    trainingPackageBrief = models.TextField(verbose_name="نبذة عن الحقيبة التدريبية")
    clientSegmentsBrief = models.TextField(verbose_name="نبذة عن شرائح العملاء")
    serviceIdea = models.TextField(verbose_name="فكرة الخدمة المراد تقديمها")

    class Meta(BaseApplication.Meta):
        verbose_name = "طلب مدرب"
        verbose_name_plural = "طلبات المدربين"


class TraineeApplication(BaseApplication):
    skillsToDevelop = models.TextField(verbose_name="المهارات المراد تطويرها")

    class Meta(BaseApplication.Meta):
        verbose_name = "طلب متدرب"
        verbose_name_plural = "طلبات المتدربين"


class JobSeekerApplication(BaseApplication):
    cityRegion = models.CharField(max_length=100, verbose_name="المدينة/المنطقة")
    educationalDegree = models.CharField(max_length=100, verbose_name="الدرجة العلمية")
    specialization = models.CharField(max_length=255, verbose_name="التخصص")
    yearsOfExperience = models.PositiveIntegerField(
        verbose_name="سنوات الخبرة", validators=[MinValueValidator(0)]
    )
    desiredWorkField = models.CharField(
        max_length=255, verbose_name="مجال العمل عن بعد المطلوب"
    )
    cvLink = models.URLField(
        max_length=500, verbose_name="رابط السيرة الذاتية", blank=True, null=True
    )

    class Meta(BaseApplication.Meta):
        verbose_name = "طلب باحث عن عمل"
        verbose_name_plural = "طلبات الباحثين عن عمل"
