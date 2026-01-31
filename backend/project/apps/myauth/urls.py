

from django.urls import path
from apps.myauth.views import google_auth

urlpatterns = [
    path('google/', google_auth, name="google-auth"),
]