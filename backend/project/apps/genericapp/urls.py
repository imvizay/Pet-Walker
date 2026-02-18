
from django.urls import path
from apps.genericapp.views import ApplicationView
urlpatterns = [
    path('job/',ApplicationView.as_view()),
    path('my/',ApplicationView.as_view())

]