from django.db import models
from apps.users.models import Client
from django.core.validators import MinValueValidator, MaxValueValidator


JOB_STATUS = [
    ('active', 'Active'),
    ('inactive', 'Inactive'),
    ('assigned', 'Assigned'),
    ('completed', 'Completed'),
    ('cancelled', 'Cancelled'),
]

SERVICE_TYPE=[
    ('walker',"walker"),
    ("groomer",'groomer'),
    ('sitter','sitter'),
    ('care','care')
]


class PetType(models.Model):
    pet_type = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.pet_type


class PetBreed(models.Model):
    pet_type = models.ForeignKey(
        PetType,
        on_delete=models.CASCADE,
        related_name="breeds",
        null=True
    )
    breed_name = models.CharField(max_length=50)

    class Meta:
        unique_together = ('pet_type', 'breed_name')

    def __str__(self):
        return f"{self.breed_name} ({self.pet_type.pet_type})"


class MyJobPost(models.Model):
    # basic info
    owner = models.ForeignKey(Client,on_delete=models.CASCADE)
    pet_profile = models.ImageField(upload_to='pet_profile')
    pet_name = models.CharField(max_length=30)
    pet_type = models.ForeignKey(PetType,on_delete=models.CASCADE) # fk
    pet_breed = models.ForeignKey(PetBreed,on_delete=models.CASCADE) # fk
    age = models.DecimalField(max_digits=3,decimal_places=1)
    weight = models.DecimalField(max_digits=4,decimal_places=2)
    gender = models.CharField(max_length=20)
    
    # time and date availability
    job_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    # extra info
    service_type = models.CharField(max_length=30,choices=SERVICE_TYPE)
    difficulty = models.CharField(max_length=30 )

    description = models.CharField(max_length=300)

    is_vaccinated = models.BooleanField(default=False)
    is_mixed_breed = models.BooleanField(default=False)

    

    