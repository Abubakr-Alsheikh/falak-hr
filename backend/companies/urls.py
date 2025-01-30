from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet

router = DefaultRouter()
router.register(r'', CompanyViewSet) # No base name needed, router infers from queryset

urlpatterns = [
    path('', include(router.urls)),
]