from django.urls import path
from .views import ContactMessageCreate

urlpatterns = [
    path('', ContactMessageCreate.as_view(), name='create_contact_message'),
]