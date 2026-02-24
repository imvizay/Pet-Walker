from django.db import models

# Create your models here.
from apps.users.models import Client
from apps.job.models import MyJobPost

APPLICATION_STATUS =[
    ("accepted","accepted"),
    ("rejected","rejected"),
    ("pending","pending"),
]

class ProviderApplication(models.Model):
    owner = models.ForeignKey(Client,on_delete=models.CASCADE,related_name="recived_applications") # linked_user
    applicant = models.ForeignKey(Client,on_delete=models.CASCADE,related_name="sent_applications") # requested_user
    job_post = models.ForeignKey(MyJobPost,on_delete=models.CASCADE,related_name="applications") # job_applications

    status = models.CharField(max_length=20,choices=APPLICATION_STATUS,default="pending")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job_post", "applicant")



class CustomerApplication(models.Model):
    customer = models.ForeignKey(Client, related_name="hire_requests_sent", on_delete=models.CASCADE)
    provider = models.ForeignKey(Client, related_name="hire_requests_received", on_delete=models.CASCADE)
    message = models.TextField(blank=True,null=True)

    status = models.CharField(max_length=20,default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['customer','provider']

