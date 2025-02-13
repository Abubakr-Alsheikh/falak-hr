# backend/subscriptions/serializers.py
from rest_framework import serializers
from .models import SubscriptionRequest

class SubscriptionRequestSerializer(serializers.ModelSerializer):
    user_type_display = serializers.CharField(source='get_user_type_display', read_only=True)
    subscription_type_display = serializers.CharField(source='get_subscription_type_display', read_only=True)

    class Meta:
        model = SubscriptionRequest
        fields = '__all__'
        read_only_fields = ('request_date', 'user_type_display', 'subscription_type_display')