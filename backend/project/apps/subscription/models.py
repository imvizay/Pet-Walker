from django.db import models
from apps.users.models import Client
# Create your models here.
from django.utils import timezone
from datetime import timedelta




# PLAN 
class SubscriptionPlan(models.Model):

    PLAN_DURATION = [("monthly","MONTHLY"),('yearly',"YEARLY")]
    plan_name = models.CharField(max_length=30,unique=True)
    price = models.DecimalField(decimal_places=2,max_digits=6 ) # 4 digit before decimal
    duration = models.CharField(max_length=20,choices=PLAN_DURATION)
    max_service = models.PositiveIntegerField(help_text="maximum service user can activate" , default=1)
    description = models.TextField(help_text="perks of the plan")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plan_name} - {self.price} {self.currency}"
    
    
# SUBSCRIBED PLAN
class SubscribedUserPlan(models.Model):

    user = models.ForeignKey(Client,on_delete=models.PROTECT,related_name="subs_user_plan")
    subscription_plan = models.ForeignKey(SubscriptionPlan,on_delete=models.PROTECT,related_name="subs_plan")
    start_date = models.DateTimeField(null=False,blank=True)
    end_date = models.DateTimeField(null=False,blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"{self.user} -> {self.subscription_plan}"
    
    def check_plan_expiry(self):
        if timezone.now() >= self.end_date:
            self.is_active = False
            self.save()
            return True
        return False 
    
    def auto_calculate_end_date(self):
        if self.subscription_plan.duration == "monthly":
            return timezone.now() + timedelta(days=30)
        
        return timezone.now() + timedelta(days=365)
    
    def save(self,*args,**kwargs):
        if not self.start_date:
            self.start_date = timezone.now()

        if not self.end_date:
            self.end_date = self.auto_calculate_end_date() 

        super().save(*args, **kwargs)

       

# PROVIDER SERVICE

class ProviderService(models.Model):

    SERVICES_CHOICE = [('walker','walker'),('sitter','sitter'),('groomer','groomer'),('care','care/trainer')]
    user = models.ForeignKey(Client,on_delete=models.CASCADE,related_name="services")
    service = models.CharField(max_length=20,choices=SERVICES_CHOICE)
    is_active = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['service','user']

