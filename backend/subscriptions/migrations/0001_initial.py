# Generated by Django 5.2 on 2025-06-14 15:57

import django.core.validators
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JobSeekerApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fullName', models.CharField(max_length=255, verbose_name='الاسم الكامل')),
                ('email', models.EmailField(max_length=254, verbose_name='البريد الإلكتروني')),
                ('whatsappNumber', models.CharField(max_length=30, verbose_name='رقم الواتساب')),
                ('ageCategory', models.CharField(max_length=100, verbose_name='الفئة العمرية')),
                ('nationality', models.CharField(max_length=100, verbose_name='الجنسية')),
                ('howHeard', models.CharField(max_length=255, verbose_name='كيف سمعت عنا')),
                ('receiveNotifications', models.CharField(max_length=50, verbose_name='استلام الإشعارات')),
                ('inquiriesNotes', models.TextField(blank=True, null=True, verbose_name='استفسارات وملاحظات')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ التقديم')),
                ('cityRegion', models.CharField(max_length=100, verbose_name='المدينة/المنطقة')),
                ('educationalDegree', models.CharField(max_length=100, verbose_name='الدرجة العلمية')),
                ('specialization', models.CharField(max_length=255, verbose_name='التخصص')),
                ('yearsOfExperience', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0)], verbose_name='سنوات الخبرة')),
                ('desiredWorkField', models.CharField(max_length=255, verbose_name='مجال العمل عن بعد المطلوب')),
                ('cvLink', models.URLField(blank=True, max_length=500, null=True, verbose_name='رابط السيرة الذاتية')),
            ],
            options={
                'verbose_name': 'طلب باحث عن عمل',
                'verbose_name_plural': 'طلبات الباحثين عن عمل',
                'ordering': ['-created_at'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TraineeApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fullName', models.CharField(max_length=255, verbose_name='الاسم الكامل')),
                ('email', models.EmailField(max_length=254, verbose_name='البريد الإلكتروني')),
                ('whatsappNumber', models.CharField(max_length=30, verbose_name='رقم الواتساب')),
                ('ageCategory', models.CharField(max_length=100, verbose_name='الفئة العمرية')),
                ('nationality', models.CharField(max_length=100, verbose_name='الجنسية')),
                ('howHeard', models.CharField(max_length=255, verbose_name='كيف سمعت عنا')),
                ('receiveNotifications', models.CharField(max_length=50, verbose_name='استلام الإشعارات')),
                ('inquiriesNotes', models.TextField(blank=True, null=True, verbose_name='استفسارات وملاحظات')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ التقديم')),
                ('skillsToDevelop', models.TextField(verbose_name='المهارات المراد تطويرها')),
            ],
            options={
                'verbose_name': 'طلب متدرب',
                'verbose_name_plural': 'طلبات المتدربين',
                'ordering': ['-created_at'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrainerApplication',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fullName', models.CharField(max_length=255, verbose_name='الاسم الكامل')),
                ('email', models.EmailField(max_length=254, verbose_name='البريد الإلكتروني')),
                ('whatsappNumber', models.CharField(max_length=30, verbose_name='رقم الواتساب')),
                ('ageCategory', models.CharField(max_length=100, verbose_name='الفئة العمرية')),
                ('nationality', models.CharField(max_length=100, verbose_name='الجنسية')),
                ('howHeard', models.CharField(max_length=255, verbose_name='كيف سمعت عنا')),
                ('receiveNotifications', models.CharField(max_length=50, verbose_name='استلام الإشعارات')),
                ('inquiriesNotes', models.TextField(blank=True, null=True, verbose_name='استفسارات وملاحظات')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ التقديم')),
                ('cityRegion', models.CharField(max_length=100, verbose_name='المدينة/المنطقة')),
                ('gender', models.CharField(max_length=50, verbose_name='الجنس')),
                ('educationalDegree', models.CharField(max_length=100, verbose_name='الدرجة العلمية')),
                ('registrationType', models.CharField(max_length=100, verbose_name='نوع التسجيل')),
                ('specialization', models.CharField(max_length=255, verbose_name='التخصص')),
                ('trainingPackageBrief', models.TextField(verbose_name='نبذة عن الحقيبة التدريبية')),
                ('clientSegmentsBrief', models.TextField(verbose_name='نبذة عن شرائح العملاء')),
                ('serviceIdea', models.TextField(verbose_name='فكرة الخدمة المراد تقديمها')),
            ],
            options={
                'verbose_name': 'طلب مدرب',
                'verbose_name_plural': 'طلبات المدربين',
                'ordering': ['-created_at'],
                'abstract': False,
            },
        ),
    ]
