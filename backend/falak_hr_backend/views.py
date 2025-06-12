from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "token_obtain_pair": reverse(
                "token_obtain_pair", request=request, format=format
            ),
            "token_refresh": reverse("token_refresh", request=request, format=format),
            "token_logout": reverse("token_logout", request=request, format=format),
            "companies": reverse("company-list", request=request, format=format),
            "users": reverse("userprofile-list", request=request, format=format),
            "projects": reverse("project-list", request=request, format=format),
            "tasks": reverse("task-list", request=request, format=format),
            # "inquiries": reverse(
            #     "list_create_contact_messages", request=request, format=format
            # ),
            "subscriptions": reverse(
                "subscription-request-list-create", request=request, format=format
            ),
            "service_request": reverse(
                "create-service-request", request=request, format=format
            ),
        }
    )


class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
