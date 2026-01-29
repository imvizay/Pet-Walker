from django.db import models
from apps.users.models import Client
# Create your models here.

GENDER_TYPE = [
    ('male','male'),
    ('female','female'),
    ('others','others'),
]

SERVICE_TYPE = [
    ('walk','Walk'),
    ('sit','Sit'),
    ('feed','Feed'),
    ('gromming','gromming'),
    ('training','training'),
]


class HireMe(models.Model):

    """" User provide themselve as a resource to the customer for a certain price  """

    profile = models.ImageField(upload_to='volunteer_pic')
    description = models.TextField()
    volunteer_name = models.ForeignKey(Client,on_delete=models.CASCADE,null=True) # relation
    gender = models.CharField(max_length=10,choices=GENDER_TYPE)
    contact = models.CharField(max_length=10)
    
    service_type = models.CharField(max_length=20,choices=SERVICE_TYPE) # service type
    service_charge = models.DecimalField(max_digits=8 ,decimal_places=2) # Rs 1,00,000.00
    
    date = models.DateTimeField()
    available_from = models.DateTimeField()
    available_to = models.DateTimeField()
   

    