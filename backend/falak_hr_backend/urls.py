from django.contrib import admin
from django.urls import path, include

from .views import api_root

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api_root, name="api-root"),
    path("api/companies/", include("companies.urls")),
    path("api/employees/", include("employees.urls")),
    path("api/tasks/", include("tasks.urls")),
]
