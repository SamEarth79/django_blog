from django.shortcuts import render
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, LogInSerializer
from rest_framework.response import Response
from rest_framework import status


def validateUser(data):
    if not data['email'] or not data['phone'] or not data['password'] or not data['conf_password']:
        return False, "Required fields are empty"

    elif data['password'] != data['conf_password']:
        return False, "Passwords do not match"

    elif len(data['password']) < 8:
        return False, "Password should be atleast 8 characters"

    elif User.objects.all().filter(email=data['email']).exists():
        return False, "Email alread registered"

    return True, ""


def validateCredentials(data):

    if not data['email'] or not data['password']:
        return False, "Required fields are empty"

    if not User.objects.all().filter(email=data['email']).exists():
        return False, "Email is not registered"

    currUser = User.objects.all().get(email=data['email'])
    if currUser.password != data['password']:
        return False, "Invalid Credentials"

    return True, currUser


class UserView(APIView):
    def get(self, request):
        output = [{"email": output.email, "password": output.password,
                   "phone": output.phone} for output in User.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        isValid, msg = validateUser(request.data)

        if not isValid:
            returnMsg = {
                'msg': msg
            }
            return Response({"allGood": "error", "data": returnMsg}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"allGood": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserSerializer(data=request.data)
        User.objects.filter(request.data['email']).update(
            phone=request.data['phone'])

        print(User.objects.all().values())
        if serializer.is_valid(raise_exception=True):
            return Response({"allGood": "success", "data": serializer.data, "currUser": {"email": request.data.email, "phone": request.data.phone}}, status=status.HTTP_200_OK)


class LogInView(APIView):

    def get(self, request):
        output = [{"email": output.email, "password": output.password,
                   "phone": output.phone} for output in User.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = LogInSerializer(data=request.data)
        isValidCredentials, msg = validateCredentials(request.data)

        if not isValidCredentials:
            returnMsg = {
                'msg': msg
            }
            return Response({"allGood": "error", "data": returnMsg}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid(raise_exception=True):
            return Response({"allGood": "success", "data": serializer.data, "currUser": {"email": msg.email, "phone": msg.phone}}, status=status.HTTP_200_OK)
