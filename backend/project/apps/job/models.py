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
    ('walking',"walking"),
    ("grooming",'grooming'),
    ('sitting','sitting'),
    ('training','training')
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


class Pet(models.Model):
    owner = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="pets",
        null=True
    )

    name = models.CharField(max_length=50)
    age = models.PositiveIntegerField()

    pet_type = models.ForeignKey(PetType, on_delete=models.CASCADE,null=True)

    # supports pure + mixed breed
    breeds = models.ManyToManyField(PetBreed, blank=True)
    difficulty = models.CharField(max_length=20,blank=True,null=True)

    is_mixed = models.BooleanField(default=False)

    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.pet_type})"


class JobPost(models.Model):
    posted_by = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="job_posts"
    )

    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name="jobs",
        null=True
        
    )

    job_title = models.CharField(max_length=100)
    job_description = models.TextField()


    job_date = models.DateTimeField()
    available_from = models.DateTimeField()
    available_to = models.DateTimeField()

    job_service = models.CharField(max_length=40,choices=SERVICE_TYPE)

    job_duration = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        help_text="Duration in hours"
    )

    job_days = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(30)],
        null=True,
        blank=True
    )

    job_fare = models.DecimalField(max_digits=8, decimal_places=2)
    location = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=JOB_STATUS,
        default='active'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job_title
