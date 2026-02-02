

from rest_framework.serializers import ModelSerializer
from apps.users.models import Client
from rest_framework import serializers

import re

class UserSerializer(ModelSerializer):

    password = serializers.CharField(write_only=True)


    def validate_email(self,value):
        # Email must be @gmail.com or hotmail.com
        value = value.strip()

        allowed_domain = ["@gmail.com","@hotmail.com"]

        if not value:
            raise serializers.ValidationError("email cannot be empty")
        
        if not any(value.endswith(domain) for domain in allowed_domain):
            raise serializers.ValidationError ("email must ends with @gmail.com/@hotmail.com")
        
        # Email should be unique

        if Client.objects.filter(email=value).exists():
            raise serializers.ValidationError("email with this account already exits.")
        
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
        fields = ['id','username','email','password']
