from django.db import models
from apps.users.models import Client
from django.core.validators import MinValueValidator,MaxValueValidator
# Create your models here.


class Ratings(models.Model):
    cleint = models.ForeignKey(Client,on_delete=models.CASCADE,null=True) # service provider/ pet owmner
    rating = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    feedback = models.TextField()


