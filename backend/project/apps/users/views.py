from django.shortcuts import render
from rest_framework.response import Response

# Create your views here.
from apps.users.models import Client as User , ClientKyc
from rest_framework.decorators import api_view,permission_classes
from apps.users.serializers import UserSerializer,ClientKycSerializer

from rest_framework.views import APIView

# Create user
@api_view(["POST"])
def user_signup(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)



from rest_framework.permissions import IsAuthenticated
import os
# runs after google o auth login and sends response of the logged in user to frontend.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def find_user(request):

    user = request.user

    return Response({
        "id": user.id,
        "profile_pic": user.profile_pic.url if user.profile_pic else "",
        "email": user.email,
        "username": user.username,
        "role": getattr(user, "role", None)
    })



# Provider update logic
class MeView(APIView):

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class MeKycView(APIView):
   
    def get(self, request):

        kyc = ClientKyc.objects.filter(
            client=request.user
        ).first()

        if not kyc:
            return Response({})

        serializer = ClientKycSerializer(kyc)
        return Response(serializer.data)


    def patch(self, request):

        kyc, created = ClientKyc.objects.get_or_create(
            client=request.user
        )

        serializer = ClientKycSerializer(
            kyc,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save(client=request.user)

        return Response(serializer.data)

