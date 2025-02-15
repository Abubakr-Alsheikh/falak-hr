from rest_framework import generics, status
from rest_framework.response import Response
from .models import SubscriptionRequest
from .serializers import SubscriptionRequestSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q


class SubscriptionRequestListCreate(generics.ListCreateAPIView):
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

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        Add search functionality.
        """
        queryset = SubscriptionRequest.objects.all()

        # Apply staff filter first
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_processed=False)

        # Add search functionality
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(
                Q(first_name__icontains=search_query) |
                Q(last_name__icontains=search_query) |
                Q(email__icontains=search_query)
            )

        return queryset