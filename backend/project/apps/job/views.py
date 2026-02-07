from django.shortcuts import render

# Create your views here.
from apps.job.models import PetType,PetBreed,PetJobPost
from rest_framework.viewsets import ReadOnlyModelViewSet
from apps.job.serializers import *

class PetTypeView(ReadOnlyModelViewSet):
    queryset = PetType.objects.all()
    serializer_class = PetTypeSerializer

class PetBreedView(ReadOnlyModelViewSet):
    serializer_class = PetBreedSerializer

    def get_queryset(self):
      pet_type_id = self.request.query_params.get("pet_type")
      qs = PetBreed.objects.all()
      if pet_type_id:
          qs = qs.filter(pet_type_id=pet_type_id)
      return qs
