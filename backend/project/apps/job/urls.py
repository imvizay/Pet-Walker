from django.urls import path
from apps.job.views import DiscoverProviders
urlpatterns = [
    path('discover/providers/',DiscoverProviders.as_view())
]