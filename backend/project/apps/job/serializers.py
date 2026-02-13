from rest_framework import serializers
from apps.users.models import Client
from apps.job.models import PetBreed,PetType,MyJobPost
from datetime import date, timedelta
from decimal import Decimal

# Read only 
class PetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model= PetType
        fields = "__all__"

class PetBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model= PetBreed
        fields = "__all__"


class MyJobPostSerializer(serializers.ModelSerializer):
    pet_profile =serializers.ImageField(required=False,allow_null=True)
    class Meta:
        model = MyJobPost
        fields = "__all__"

    def validate(self, data):

        errors = {}

        pet_profile = data.get('pet_profile')
        name = data.get('pet_name')
        job_date = data.get('job_date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        age = data.get('age')
        weight = data.get('weight')
        pet_type = data.get("pet_type")
        pet_breed = data.get("pet_breed")

        # NAME
        if not name or not name.strip():
            errors['pet_name'] = "Pet name cannot be empty"

        # DATE
        today = date.today()
        if job_date:
            if job_date < today:
                errors['job_date'] = "Cannot be past"

            if job_date > today + timedelta(days=30):
                errors['job_date'] = "Max 30 days ahead"

        # TIME
        if start_time and end_time:
            if end_time <= start_time:
                errors['end_time'] = "End must be after start"

        # DECIMALS
        if age is not None and age < Decimal("0"):
            errors['age'] = "Age negative"

        if weight is not None and weight <= Decimal("0"):
            errors['weight'] = "Weight must be positive"

        # FK integrity
        if pet_type and pet_breed:
            if pet_breed.pet_type_id != pet_type.id:
                errors["pet_breed"] = "Breed mismatch"

        # IMAGE SIZE
        if pet_profile and pet_profile.size > 5 * 1024 * 1024:
            errors['pet_profile'] = "Max 5MB image"

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
    # if profile provided use it otherwise keep existing one.
    def update(self, instance, validated_data):

        pet_profile = validated_data.get("pet_profile",None)

        if pet_profile is None:
            validated_data["pet_profile"] = instance.pet_profile

        return super().update(instance, validated_data)


from apps.subscription.models import ProviderService
from apps.subscription.models import ProviderService
# Discover jobs serializer

class DiscoverProviderSerializer(serializers.ModelSerializer):

    services = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = [
            "id",
            "username",
            "profile_pic",
            "has_subscription",
            "services"
        ]
    def get_services(self, client):
     return client.services.filter(is_active=True).values_list("service", flat=True)

