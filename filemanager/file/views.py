from django.shortcuts import render
from rest_framework.views import APIView
from .models import File
from .serializer import FileSerializer
from rest_framework.response import Response


class FileView(APIView):
    def get(self, request):
        output = [{"filename": output.filename, "extension": output.extension}
                  for output in File.objects.all()]

        return Response(output)

    def post(self, request):
        serializer = FileSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
