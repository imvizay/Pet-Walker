from rest_framework import serializers
from apps.users.models import Client
from apps.job.models import PetBreed,PetType,PetJobPost

# Read only 
class PetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model= PetType
        fields = "__all__"

class PetBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model= PetBreed
        fields = "__all__"

# business logic
class PetJobPost(serializers.ModelSerializer):
    class Meta:
        model = PetJobPost
        fields ="__all__"