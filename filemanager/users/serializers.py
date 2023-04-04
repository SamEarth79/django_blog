from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'conf_password', 'phone']


class LogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'phone']
