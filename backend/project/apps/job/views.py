from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet

# Create your views here.
from apps.job.models import PetType,PetBreed,MyJobPost
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
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


# JOB CREATION 

class MyJobPostView(ModelViewSet):
    serializer_class = MyJobPostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user

    
        if user.is_staff:
            return MyJobPost.objects.all()

        return MyJobPost.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        

    
    