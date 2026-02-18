from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from apps.genericapp.models import Applications

from apps.genericapp.serializers import ApplicationSerializer
# Create your views here.


class ApplicationView(ListCreateAPIView):
    queryset = Applications.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user  = self.request.user

        return Applications.objects.filter(owner=user).select_related("job_post","applicant")


    
        

