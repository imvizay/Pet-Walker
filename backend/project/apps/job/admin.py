from django.contrib import admin
from apps.job.models import PetBreed,PetType,MyJobPost
from apps.users.models import Client
# Register your models here.

admin.site.register([PetBreed,PetType,Client,MyJobPost])
