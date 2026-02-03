from django.shortcuts import render
from rest_framework.decorators import api_view

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

User = get_user_model()

GOOGLE_CID = "896067105432-mmaaq34vcggd59dfm6tbrvf37n2uv2f2.apps.googleusercontent.com"

# Create your views here.
@api_view(["POST"])
def google_authentication(request):
    token = request.data.get("token")
    role = request.data.get("role")

    if not token:
        raise ValueError("Frontend token required to match that with the backend request to google")
    
    try:
        id_info = id_token.verify_oauth2_token(
                    token,
                    google_requests.Request(),
                    GOOGLE_CID
                )
    except ValueError:
        return Response({"invalid google token"},status=400)
    
    email = id_info.get("email")

    if not email:
        return Response({"error":"google account has no email"},status=400)
    
    user, _ = User.objects.get_or_create(email=email,
                               defaults={
                                   "username":email.split("@")[0],
                                   "role":role
                                }
                               )
    refresh = RefreshToken.for_user(user)

    return Response({ "access":str(refresh.access_token), "refresh":str(refresh),
        "user":{
            "id":user.id,
            "email":user.email,
            "username":user.username
        }
        })




