from django.urls import path
from apps.job.views import DiscoverProviders ,DiscoverJobs
urlpatterns = [
    path('discover/providers/',DiscoverProviders.as_view()),
    path("listed-jobs/",DiscoverJobs.as_view())
]