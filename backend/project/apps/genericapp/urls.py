
from django.urls import path
from apps.genericapp.views import OwnerApplicationView ,UpdateApplication ,ProviderApplicationView,CustomerApplicationView,CustomerApplicationUpdateView

urlpatterns = [
    # ================= PROVIDER MAKING REQ AND CUSTOMER TAKING ACTION ROUTES ================
    # receive job application on customer-dashboard from job post by provider dashboard.
    path('job/',OwnerApplicationView.as_view()),

    # at customer-dashboard fetch all application made by provider for the job post made.    
    path('my/',OwnerApplicationView.as_view()), 

    # updating status (accepting and rejecting) of application recived by service provider so far on the job post published.
    path('status/<int:pk>/',UpdateApplication.as_view()),

    
    # ===== Customer Dashboard Service Provider Listing Page Routes ========
    # send request to provider to trade his service.
    path('request-provider/',CustomerApplicationView.as_view()),

    # recived request made by customer at provider dashboard application page.
    path('request-received/',CustomerApplicationView.as_view()),
    
    path('request-received/status/<int:pk>/',CustomerApplicationUpdateView.as_view())





    

]