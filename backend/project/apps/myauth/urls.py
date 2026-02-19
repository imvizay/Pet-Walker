

from django.urls import path
from apps.myauth.views import google_authentication

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('google/', google_authentication, name="google-auth"),
    path('login/', TokenObtainPairView.as_view() ,name="login-view"),
    path('login/refresh/', TokenRefreshView.as_view() ,name="login-refresh-view")
]