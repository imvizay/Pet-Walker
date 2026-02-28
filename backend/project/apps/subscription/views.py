from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.validators import ValidationError
# serializer
from apps.subscription.serializers import SubscriptionPlanUserSerializer,ProviderServiceSerializer
# models
from apps.subscription.models import SubscribedUserPlan,ProviderService, SubscriptionPlan
from rest_framework.response import Response

from rest_framework.views import APIView
# Create your views here.


@api_view(["GET"])
def get_subscription_detail(request):
    user = request.user

    if not user:
        raise ValidationError({"user":"at 'line : 12 subscription.views.py fn:get_subscription_detail ' unauthenticated user/check request header"})
    
    subscription = SubscribedUserPlan.objects.filter(user=user.id,is_active=True).first()

    if not subscription:
        # return SubscribedUserPlan.objects.filter(user=user.id,is_active=False,)
        raise ValidationError({"plan":"FREE"})
    
    serializer = SubscriptionPlanUserSerializer(subscription)

    return Response(serializer.data)
    
    
from rest_framework import status
@api_view(["GET","POST","DELETE"])
def activate_services(request):
    req_user = request.user

    # ---------------- GET ----------------
    if request.method == "GET":
        qs = ProviderService.objects.filter(user=req_user)
        serializer = ProviderServiceSerializer(qs, many=True)
        return Response(serializer.data)

    # ---------------- POST ----------------
    services = request.data

    if not isinstance(services, list):
        return Response(
            {"error": "Send services as a list"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ---- get subscription ----
    sub = SubscribedUserPlan.objects.filter(
        user=req_user,
        is_active=True
    ).select_related("subscription_plan").first()

    # ---- determine limit ----
    if not sub or sub.subscription_plan.plan_name == "FREE":
        allowed = 1
    else:
        allowed = sub.subscription_plan.max_services   # or whatever your field is

    # ---- count existing active services ----
    active_count = ProviderService.objects.filter(
        user=req_user,
        is_active=True
    ).count()

    remaining_slots = max(allowed - active_count, 0)

    if remaining_slots <= 0:
        return Response(
            {"error": f"Your plan allows only {allowed} active service(s)."},
            status=status.HTTP_400_BAD_REQUEST
        )

    activated = []

    for s in services:
        if remaining_slots <= 0:
            break

        obj, created = ProviderService.objects.get_or_create(
            user=req_user,
            service=s
        )

        if not obj.is_active:
            obj.is_active = True
            obj.save()
            activated.append(s)
            remaining_slots -= 1

    return Response({
        "message": "Services activated",
        "activated": activated,
        "remaining_slots": remaining_slots
    })


@api_view(["POST"])
def publish_service(request,pk):
    user = request.user

    qs_obj = ProviderService.objects.filter(user=user,id=pk).first()

    if not qs_obj:
        raise ValidationError({"error":"no serive found with the given id in the database."})
    
    if qs_obj.is_published:

        qs_obj.is_published = False
        qs_obj.save()

        return Response({"msg":"Service will be un-pulished shortly.Thank you."})

    qs_obj.is_published=True
    qs_obj.save()
    return Response({"msg":"service will be published soon.Thank you"})



class SubscriptionView(APIView):

    def post(self, request, plan):
        plan_id = request.query_params.get("plan_id")
        user = request.user

        if not plan_id:
            return Response(
                {"error": "plan_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            selected_plan = SubscriptionPlan.objects.get(
                id=plan_id,
                plan_name=plan
            )
        except SubscriptionPlan.DoesNotExist:
            return Response(
                {"error": "Plan does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        # prevent duplicate active plan
        if SubscribedUserPlan.objects.filter(
            user=user,
            subscription_plan=selected_plan,
            is_active=True
        ).exists():
            return Response(
                {"error": "User already has this active subscription"},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_plan = SubscribedUserPlan.objects.create(
            user=user,
            subscription_plan=selected_plan
        )

        return Response({
            "message": "Subscription activated",
            "plan": created_plan.subscription_plan.plan_name,
            "expires_on": created_plan.end_date
        }, status=status.HTTP_201_CREATED)