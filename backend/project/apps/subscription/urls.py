
from django.urls import path
from apps.subscription import views

urlpatterns = [
    path('subscription/sub-type/',views.get_subscription_detail,name='get-subscription'),
    path('service/activate/',views.activate_services,name='activate-services'),
    path('services/',views.activate_services,name='activate-services'),

    path('publish/service/<int:pk>/',views.publish_service,name='publish-service'),

    # subscription plan
    path('subscription/<str:plan>/',views.SubscriptionView.as_view())

]