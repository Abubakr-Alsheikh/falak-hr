from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken # Import AccessToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
import logging

logger = logging.getLogger(__name__)

@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "companies": reverse("company-list", request=request, format=format),
            "employees": reverse("employee-list", request=request, format=format),
            "tasks": reverse("task-list", request=request, format=format),
            "token_obtain_pair": reverse(
                "token_obtain_pair", request=request, format=format
            ),
        }
    )

class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            # Get the access token from the header
            access_token_string = request.META.get('HTTP_AUTHORIZATION', ' ').split(' ')[1]

            if not access_token_string:
                return Response({"error": "Missing access token"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Decode the access token to ensure it's valid
                AccessToken(access_token_string) # This will raise an exception if the token is invalid

                #Blacklist the access token
                try:
                    token = OutstandingToken.objects.get(token=access_token_string, user_id=request.user.id)
                    BlacklistedToken.objects.create(token=token)
                    return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
                except OutstandingToken.DoesNotExist:
                    return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
            except TokenError as e:
                logger.error(f"Invalid access token: {e}") # Log the error
                return Response({"error": "Invalid access token"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.exception("An unexpected error occurred during logout.") # Log the full exception
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)