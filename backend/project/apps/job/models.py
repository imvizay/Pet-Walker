from django.db import models
from apps.users.models import Client
from django.core.validators import MinValueValidator,MaxValueValidator


JOB_TYPES = [
    ('part_time', 'Part Time'),
    ('full_time', 'Full Time'),
    ('one_time', 'One Time'),
]

JOB_STATUS = [
    ('active', 'active'),
    ('inactive', 'inactive'),
    ('assigned', 'Assigned'),
    ('completed', 'Completed'),
    ('cancelled', 'Cancelled'),
]

PET_TYPES = [
    ('dog', 'Dog'),
    ('cat', 'Cat'),
    ('other', 'Other'),
]


class JobPost(models.Model):

    posted_by = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="job_posts")

    title = models.CharField(max_length=100)
    description = models.TextField()

    date = models.DateTimeField()

    available_from = models.DateTimeField()
    available_to = models.DateTimeField()


    pet_type = models.CharField(max_length=10, choices=PET_TYPES)
    pet_breed = models.CharField(max_length=50, blank=True,null=True)

    job_type = models.CharField(max_length=20, choices=JOB_TYPES) 
    job_duration = models.DecimalField(max_digits=4, decimal_places=2)  # hours
    job_days = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(7)],null=True,blank=True) # for days

    job_fare = models.DecimalField(max_digits=8, decimal_places=2)      # money

    location = models.CharField(max_length=100) 

    status = models.CharField(max_length=20, choices=JOB_STATUS, default='open')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
