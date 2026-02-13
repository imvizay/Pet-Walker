from apps.subscription.models import SubscribedUserPlan,SubscriptionPlan,ProviderService
from rest_framework import serializers

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ["plan_name","duration","max_service"]


class SubscriptionPlanUserSerializer(serializers.ModelSerializer):
    subscription_plan = serializers.CharField(source="subscription_plan.plan_name" , read_only=True)
    duration = serializers.CharField(source="subscription_plan.duration",read_only=True)
    max_service = serializers.IntegerField(source="subscription_plan.max_service",read_only=True)

    class Meta:
        model = SubscribedUserPlan
        fields = ['max_service','duration','user','subscription_plan',"is_active","start_date","end_date"]
        


class ProviderServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderService
        fields = "__all__"

