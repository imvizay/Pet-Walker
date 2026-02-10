

from rest_framework.serializers import ModelSerializer
from apps.users.models import Client , ClientKyc
from rest_framework import serializers
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError
import re

class UserSerializer(ModelSerializer):

    role = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    profile_pic = serializers.ImageField(read_only=True)
    


    def validate_email(self,value):
        # Email must be @gmail.com or hotmail.com
        value = value.strip()

        allowed_domain = ["@gmail.com","@hotmail.com"]

        if not value:
            raise serializers.ValidationError("email cannot be empty")
        
        if not any(value.endswith(domain) for domain in allowed_domain):
            raise serializers.ValidationError ("email must ends with @gmail.com/@hotmail.com")
            
        # Email username before @gmail should be alphanumeric and not contains only digits 

        local_part = value.split("@")[0]

        if local_part.isdigit():
            raise serializers.ValidationError("Email username cannot be only digits only 798...@gmail.com")
        
        if not local_part.replace(".",'').isalnum():
            raise serializers.ValidationError("Email should be alphanumeric")
        
        return value
        
    
    def validate_password(self,value):
        # password 4-8 alphamueric 
        value = value.strip()
        if not value:
            raise serializers.ValidationError("password cannot be empty")
        
        if len(value) < 4 or len(value) > 8:
            raise serializers.ValidationError("password should range in between 4-8 characters")
        
        if not re.search(r"[AZa-z ]",value) or not re.search(r"\d",value):
            raise serializers.ValidationError("password should be combination of alphabets and numbers only.")    

        return value
        

    class Meta:
        model = Client
        fields = ['id',"profile_pic",'username','email','password',"role"]
        
        extra_kwargs = {"email" : {"validators" : []} }

   

    def create(self, validated_data):

        role = validated_data.pop("role")
        email = validated_data.get("email")

        user = Client.objects.filter(email=email).first()

        if user:

            if role in user.role:
                raise ValidationError({"role":f"email with the selected role({role}) already exists."})
            
            user.role.append(role)
            user.save()
            return user

        try:
            user = Client.objects.create_user(**validated_data)
            user.role = [role]
            user.save()
            return user

        except IntegrityError:
            # Edge case: two requests at same time
            user = Client.objects.get(email=email)
            if role not in user.role:
                user.role.append(role)
                user.save()
            return user



class ClientKycSerializer(serializers.ModelSerializer): 
    contact = serializers.CharField(required=False,allow_null=True,default="n/a")
    client = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = ClientKyc
        fields = "__all__"