from rest_framework import status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db import models
from rest_framework import viewsets
from rest_framework.exceptions import NotFound


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get("search")
        ordering = self.request.query_params.get("ordering", None)

        if search_term:
            queryset = queryset.filter(
                models.Q(name__icontains=search_term)
                | models.Q(email__icontains=search_term)
                | models.Q(phone__icontains=search_term)
                | models.Q(message__icontains=search_term)
            )
        if ordering:
            queryset = queryset.order_by(ordering)
        return queryset

    def get_object(self):
        """
        Retrieve the object, handling the case where it doesn't exist.
        """
        try:
            return super().get_object()
        except ContactMessage.DoesNotExist:
            raise NotFound("The requested contact message does not exist.")

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            return Response(
                {"detail": "The requested contact message does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
