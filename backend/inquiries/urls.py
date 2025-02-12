from django.urls import path
from .views import ContactMessageListCreate

urlpatterns = [
    path('', ContactMessageListCreate.as_view(), name='list_create_contact_messages'),
]