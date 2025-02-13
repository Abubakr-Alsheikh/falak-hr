# backend/subscriptions/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import SubscriptionRequest
from .serializers import SubscriptionRequestSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class SubscriptionRequestListCreate(generics.ListCreateAPIView):
    queryset = SubscriptionRequest.objects.all()
    serializer_class = SubscriptionRequestSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                {
                    "message": "تم إرسال طلب الاشتراك بنجاح.  سنتواصل معك قريبًا.",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        return Response(
            {
                "errors": serializer.errors,
                "message": "حدث خطأ أثناء إرسال طلب الاشتراك.",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"message": "قائمة طلبات الاشتراك", "data": serializer.data})

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = SubscriptionRequest.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_processed=False)
        return queryset
