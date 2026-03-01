from django.shortcuts import render

from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet

# Create your views here.
from apps.job.models import PetType,PetBreed,MyJobPost
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from apps.job.serializers import *

from project.permissions import IsCustomer


class PetTypeView(ReadOnlyModelViewSet):
    queryset = PetType.objects.all()
    serializer_class = PetTypeSerializer
    permission_classes = [IsCustomer]

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
    permission_classes = [IsCustomer]
    
    
    def get_queryset(self):
        user = self.request.user

    
        if user.is_staff:
            return MyJobPost.objects.all()

        return MyJobPost.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        
# Filter endpoint view

from django.db.models import Case, When, Value, IntegerField
from rest_framework.generics import ListAPIView

from apps.job.pagination import pagination

class DiscoverProviders(ListAPIView):
    pagination_class = pagination.ProviderPagination
    serializer_class = DiscoverProviderSerializer
    permission_classes = [IsCustomer]

    def get_queryset(self):

        squery = self.request.GET.get("query")

        # Base queryset
        qs = Client.objects.filter(
            role__icontains='provider',
            is_active=True,
            services__is_active=True
        )

        # Apply search ONLY if user typed something
        if squery:
            qs = qs.filter(
                services__service__icontains=squery
            )

        # Sort subscribed users first
        qs = qs.annotate(
            subscription_priority=Case(
                When(has_subscription=True, then=Value(0)),
                default=Value(1),
                output_field=IntegerField()
            )
        ).order_by('subscription_priority')

        return qs.distinct()


from apps.job.serializers import DiscoverJobsSerializer
class DiscoverJobs(ListAPIView):
    serializer_class = DiscoverJobsSerializer
    

    def get_queryset(self):
        qs = MyJobPost.objects.filter(is_active=True).select_related("owner","pet_type","pet_breed")
        service = self.request.query_params.get("service")

        if service:
            qs = qs.filter(service_type = service)
            return qs

        return qs.order_by('-job_date')