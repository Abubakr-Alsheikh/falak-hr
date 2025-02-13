# backend/subscriptions/tests.py
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import SubscriptionRequest

class SubscriptionRequestTests(APITestCase):
    def test_create_subscription_request(self):
        url = reverse('subscription-request-list-create')
        data = {
            'user_type': 'employer',
            'subscription_type': 'gold',
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'test@example.com',
            'phone_number': '123-456-7890',
            'company_name': 'Test Company',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SubscriptionRequest.objects.count(), 1)
        self.assertEqual(SubscriptionRequest.objects.get().first_name, 'Test')