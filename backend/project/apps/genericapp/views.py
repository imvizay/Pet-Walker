from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,UpdateAPIView
from apps.genericapp.models import Applications
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from apps.genericapp.serializers import ApplicationSerializer
# Create your views here.


class UpdateApplication(UpdateAPIView):
    queryset = Applications.objects.all()
    serializer_class = ApplicationSerializer

    def patch(self, request, *args, **kwargs):
        applicant_id = request.data.get("applicant_id")
        post_owner = request.user

        try:
            application = Applications.objects.get( id=kwargs.get("pk"),
                                                    owner=post_owner,
                                                    applicant = applicant_id
                                                  )
        except Applications.DoesNotExist:
            return Response(
                            {"error":"application not found"},
                            status=status.HTTP_404_NOT_FOUND
                            )
        
        new_status = request.data.get("action")

        if new_status not in ["accepted","rejected"]:
            return Response(
                            {"error":"invalid status"},
                            status=status.HTTP_400_BAD_REQUEST
                            )
        
        application.status = new_status
        application.save()

        return Response(
                        {"message","Status Updated","status",
                        application.status},status=status.HTTP_200_OK
                        ) 




class OwnerApplicationView(ListCreateAPIView):
    queryset = Applications.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user  = self.request.user
        return Applications.objects.filter(owner=user,status="pending").select_related("job_post","applicant")


class ProviderApplicationView(ListCreateAPIView):
    queryset = Applications.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        
        user = self.request.user

        if not user.is_authenticated:
            return Applications.objects.none()
        
        qs = Applications.objects.filter(
                                        applicant = user,
                                        status__in = ["accepted","rejected","pending"]).select_related(
                                                                                        "job_post",
                                                                                        "applicant"
                                                                                        )   
        return qs

            
class CustomerHireRequest(ListCreateAPIView):
    queryset = Applications.objects.all()
    serializer_class = ApplicationSerializer