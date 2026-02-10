
from django.urls import path
from apps.subscription import views

urlpatterns = [
    path('subscription/sub-type/',views.get_subscription_detail,name='get-subscription'),
    path('service/activate/',views.activate_services,name='activate-services'),
    path('services/',views.activate_services,name='activate-services'),

]