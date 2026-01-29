from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


JOBTYPE = [
    ('full_time', 'Full Time'),
    ('part_time', 'Part Time'),
    ('one_time', 'One Time'),
]

JOBROLE = [
    ('service_provider','service_provider'),
    ('customer','customer'),
]

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)
    profile_pic = models.ImageField(upload_to="profile_pic") 

    # address
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    contact = models.CharField(max_length=15)

    role = models.CharField(max_length=20,choices=JOBROLE) # customer/serviceprovider

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    has_susbscription = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    objects = UserManager()



    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.email
