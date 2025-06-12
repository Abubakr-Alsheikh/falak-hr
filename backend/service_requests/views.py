from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import ServiceRequest
from .serializers import ServiceRequestSerializer


class ServiceRequestViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and creating ServiceRequest instances.
    Provides 'list' (GET /api/service-requests),
    'create' (POST /api/service-requests),
    and 'retrieve' (GET /api/service-requests/{id}) actions.
    """

    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    parser_classes = [MultiPartParser, FormParser]

    # The default 'list' and 'retrieve' methods from ModelViewSet will work
    # perfectly with our serializer's `to_representation` for output.

    def create(self, request, *args, **kwargs):
        """
        Handles the POST request to create a ServiceRequest.
        Customizes success and error responses to match the specification.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            # --- SUCCESS Response (201 Created) ---
            return Response(
                {
                    "id": serializer.instance.id,
                    "status": serializer.instance.status,
                    "message": "Service request submitted successfully.",
                },
                status=status.HTTP_201_CREATED,
                headers=headers,
            )
        except ValidationError as e:
            # --- CLIENT-SIDE ERROR Response (400 Bad Request) ---
            formatted_errors = {}
            for field, messages in e.detail.items():
                if isinstance(messages, list) and messages:
                    formatted_errors[field] = messages[0]
                else:
                    formatted_errors[field] = str(messages)

            return Response(
                {"message": "The given data was invalid.", "errors": formatted_errors},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            # --- SERVER-SIDE ERROR Response (500 Internal Server Error) ---
            print(f"An unexpected server error occurred: {e}")
            return Response(
                {
                    "message": "An unexpected server error occurred. Please try again later or contact support."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    # Note: ModelViewSet also provides `update`, `partial_update`, and `destroy` methods.
    # If you only want `list`, `retrieve`, and `create`, you could use `ListModelMixin`,
    # `RetrieveModelMixin`, `CreateModelMixin` with `GenericViewSet` instead of `ModelViewSet`.
    # For now, ModelViewSet is concise and allows for future expansion.
    # To limit allowed methods: `http_method_names = ['get', 'post']` can be added to the ViewSet.
    # However, for a full CRUD resource, ModelViewSet is standard.
