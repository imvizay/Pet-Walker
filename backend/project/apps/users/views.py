from django.shortcuts import render
from rest_framework.response import Response

# Create your views here.
from apps.users.models import Client as User
from rest_framework.decorators import api_view,permission_classes
from apps.users.serializers import UserSerializer

# Create user
@api_view(["POST"])
def user_signup(request):

    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)



from rest_framework.permissions import IsAuthenticated

# current user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def find_user(request):
    user = request.user

    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "role": getattr(user, "role", None)
    })






