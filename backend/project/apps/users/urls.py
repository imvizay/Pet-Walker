
from apps.users.views import MeView,MeKycView
from django.urls import path

urlpatterns = [
    path('me/',MeView.as_view()),
    path('me/kyc/',MeKycView.as_view()),
]