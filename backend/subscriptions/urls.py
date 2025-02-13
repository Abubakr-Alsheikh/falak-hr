# backend/subscriptions/urls.py
from django.urls import path
from .views import SubscriptionRequestListCreate

urlpatterns = [
    path('', SubscriptionRequestListCreate.as_view(), name='subscription-request-list-create'),
]