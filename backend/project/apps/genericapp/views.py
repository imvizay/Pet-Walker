from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,UpdateAPIView
from apps.genericapp.models import ProviderApplication,CustomerApplication
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response

from apps.genericapp.serializers import ApplicationSerializer,CustomerApplicationSerializer
# Create your views here.


# Customer( create application by service provider for the job post of customer )
class ProviderApplicationView(ListCreateAPIView):
    """
    Fetches all application either pending rejected or accepted by the pet owner/customer at provider dashboard.
    """
    queryset = ProviderApplication.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        
        user = self.request.user

        if not user.is_authenticated:
            return ProviderApplication.objects.none()
        
        qs = ProviderApplication.objects.filter(
                                        applicant = user,
                                        status__in = ["accepted","rejected","pending"]).select_related(
                                                                                        "job_post",
                                                                                        "applicant"
                                                                                        )   
        return qs



# Customer Application View(fetches all applications regarding a job post)
class OwnerApplicationView(ListCreateAPIView):
    """
    Fetches all application request that is pending at customer dashboard of the service provider.
    """
    queryset = ProviderApplication.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user  = self.request.user
        return ProviderApplication.objects.filter(owner=user,status="pending").select_related("job_post","applicant")
    
# Customer Dashboard (updates application recived on a job post.)
class UpdateApplication(UpdateAPIView):
    """
    Updating status of application sended by the service provider 
    """
    queryset = ProviderApplication.objects.all()
    serializer_class = ApplicationSerializer

    def patch(self, request, *args, **kwargs):
        applicant_id = request.data.get("applicant_id")
        post_owner = request.user

        try:
            application = ProviderApplication.objects.get( id=kwargs.get("pk"),
                                                    owner=post_owner,
                                                    applicant = applicant_id
                                                  )
        except ProviderApplication.DoesNotExist:
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



# Provider Dashboard ( create application of customer for the services he sended request to the service provider. )  
class CustomerApplicationView(ListCreateAPIView):

    """
    View for Customer to send application request to the service provider for the services that has published.
    """
    queryset = CustomerApplication.objects.all()
    serializer_class = CustomerApplicationSerializer


# Update Customers Request sended to provider

class CustomerApplicationUpdateView(UpdateAPIView):
    queryset = CustomerApplication.objects.all()
    serializer_class = CustomerApplicationSerializer

    def patch(self, request, *args, **kwargs):

        provider = request.user
        new_status = request.data.get("status")

        if new_status not in ["accepted", "rejected"]:
            return Response( {"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST )

        try:
            application = CustomerApplication.objects.get( id=kwargs.get("pk"), provider=provider )
        except CustomerApplication.DoesNotExist:
            return Response( {"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND )

        application.status = new_status
        application.save()

        return Response({ "message": "Status updated successfully", "status": application.status }, status=status.HTTP_200_OK)