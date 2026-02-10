from django.contrib import admin

# Register your models here.
from apps.subscription.models import SubscribedUserPlan,SubscriptionPlan

admin.site.register([SubscribedUserPlan,SubscriptionPlan])