from django.contrib import admin
from apps.job.models import Pet,PetBreed,PetType,JobPost
from apps.users.models import Client
# Register your models here.

admin.site.register([Pet,PetBreed,PetType,Client])
