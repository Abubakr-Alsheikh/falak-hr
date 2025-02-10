from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import api_root, LogoutView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api_root, name="api-root"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # For getting access and refresh tokens
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # For refreshing access tokens
    path('api/token/logout/', LogoutView.as_view(), name='token_logout'),
    path("api/companies/", include("companies.urls")),
    path("api/employees/", include("employees.urls")),
    path("api/tasks/", include("tasks.urls")),
]
