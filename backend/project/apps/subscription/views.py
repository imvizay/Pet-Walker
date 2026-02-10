from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.validators import ValidationError
# serializer
from apps.subscription.serializers import SubscriptionPlanUserSerializer,ProviderServiceSerializer
# models
from apps.subscription.models import SubscribedUserPlan,ProviderService
from rest_framework.response import Response

# Create your views here.


@api_view(["GET"])
def get_subscription_detail(request):
    user = request.user

    if not user:
        raise ValidationError({"user":"at 'line : 12 subscription.views.py fn:get_subscription_detail ' unauthenticated user/check request header"})
    
    subscription = SubscribedUserPlan.objects.filter(user=user.id,is_active=True).first()

    if not subscription:
        raise ValidationError({"plan":"FREE"})
    
    serializer = SubscriptionPlanUserSerializer(subscription)

    return Response(serializer.data)
    
    
@api_view(["GET","POST","DELETE"])

def activate_services(request):
    req_user = request.user

    if request.method == "GET":
        qs = ProviderService.objects.filter(user=req_user)
        serializer = ProviderServiceSerializer(qs,many=True)

        return Response(serializer.data)
    
    if request.method == "POST":
        services = request.data
        
        for s in services:
            ProviderService.objects.get_or_create(
                user=request.user,
                service=s,
                is_active=True
            )


        return Response({"msg":"Request Recieved services will be activated shortly."})





    


    
   


    

