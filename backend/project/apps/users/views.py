from django.shortcuts import render
from rest_framework.response import Response

# Create your views here.
from rest_framework.decorators import api_view
from apps.users.serializers import UserSerializer
@api_view(["POST"])
def user_signup(request):

    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)