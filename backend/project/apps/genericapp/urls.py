
from django.urls import path
from apps.genericapp.views import OwnerApplicationView ,UpdateApplication , ProviderApplicationView,CustomerHireRequest
urlpatterns = [
    path('job/',OwnerApplicationView.as_view()),
    path('my/',OwnerApplicationView.as_view()),
    path('status/<int:pk>/',UpdateApplication.as_view()),
    path('/hire-request/',CustomerHireRequest.as_view())
    # provider application routes
    path("provider/",ProviderApplicationView.as_view())

]