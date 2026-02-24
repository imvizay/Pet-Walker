

from rest_framework import serializers
from apps.genericapp.models import ProviderApplication , CustomerApplication
from apps.job.models import MyJobPost

from rest_framework.validators import ValidationError
from apps.users.models import Client
class ApplicationSerializer(serializers.ModelSerializer):

    job_post = serializers.PrimaryKeyRelatedField(
                        queryset=MyJobPost.objects.all() ,
                        write_only=True
                        )

    applicant = serializers.CharField(source="applicant.username",read_only=True)
    job_name = serializers.CharField(source="job_post.service_type",read_only=True)
    pet_name = serializers.CharField(source="job_post.pet_name",read_only=True)
    job_date = serializers.CharField(source="job_post.job_date",read_only=True)
    profile_pic = serializers.ImageField(source="owner.profile_pic",read_only=True)
    service_type = serializers.CharField(source="job_post.service_type",read_only=True)
    applicant_id = serializers.CharField(source="applicant.id",read_only=True)
   
    class Meta:
        model = ProviderApplication
        fields = ["id","applicant","job_post","owner","job_name","pet_name","job_date","profile_pic","service_type","applicant_id","status"]
        read_only_fields = ["id","status"]
        

    def validate(self,attrs):
        request = self.context["request"]
        user = request.user
        job = attrs["job_post"]

        if job.owner == user:
            raise ValidationError({"error":"Cannot apply for your own job."})
        
        if ProviderApplication.objects.filter(job_post=job,applicant=user).exists():
            raise ValidationError({"error":"You already applied for this job."})

        return attrs
    
    def create(self, validated_data):
       
       request = self.context["request"]
       validated_data["applicant"] = request.user
       validated_data["job_post"] = validated_data["job_post"]
       return super().create(validated_data)
    

class CustomerApplicationSerializer(serializers.ModelSerializer):
    customer_profile_pic = serializers.ImageField(source = "customer.profile_pic",read_only=True)
    customer_username = serializers.CharField(source = "customer.username",read_only=True)
    customer_email = serializers.EmailField(source = "customer.email",read_only=True)

    class Meta:
        model = CustomerApplication
        fields = ['id','provider','customer','status','customer_profile_pic','customer_username','customer_email']
        read_only_fields =['id','customer','status']

    def validate(self, attrs):
        request = self.context['request']

        if request.user == attrs["provider"]:
            raise ValidationError({"error":"cannot send request to yourself"})
        
        if CustomerApplication.objects.filter(provider=attrs["provider"],customer = request.user):
            raise ValidationError({"error":"You already request for this service provider."}) 
        

    def create(self, validated_data):
        request = self.context["request"]
        validated_data["customer"] = request.user
        return super().create(validated_data)

    

    
