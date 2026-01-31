from rest_framework.serializers import ModelSerializer

from apps.job.models import Pet,PetBreed,PetType,JobPost

# Read only 
class PetTypeSerializer(ModelSerializer):
    class Meta:
        model= PetType
        fields = "__all__"

class PetBreedSerializer(ModelSerializer):
    class Meta:
        model= PetBreed
        fields = "__all__"

class PetTypeSerializer(ModelSerializer):
    class Meta:
        model = PetType
        fields = "__all__"



# business logic
class PetSerializer(ModelSerializer):
    class Meta:
        model = Pet
        fields= "__all__"

class JobPostSerializer(ModelSerializer):
    class Meta:
        model = JobPost
        fields ="__all__"