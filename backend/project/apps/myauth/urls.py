

from django.urls import path
from apps.myauth.views import google_authentication

urlpatterns = [
    path('google/', google_authentication, name="google-auth"),
]