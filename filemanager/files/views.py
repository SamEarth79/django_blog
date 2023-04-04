from django.shortcuts import render
from .models import Files
from rest_framework import viewsets
from .serializers import FileSerializer


class FilesViewsets(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer
