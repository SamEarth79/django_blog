from django.shortcuts import render
from .models import Files
from rest_framework import viewsets
from .serializers import FileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class FilesViewsets(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer

    def list(self, request):
        queryset = Files.objects.all()
        serializer = FileSerializer(queryset, many=True)
        output = []
        for index in range(len(queryset)):
            output.append({
                "id": queryset[index].id,
                "FILE": serializer.data[index]['FILE'],
                "uploaded_on": queryset[index].uploaded_on,
                "user": queryset[index].user
            })
        return Response(output)


# class FileView(APIView):

#     def get(self, request):
#         output = [{
#             "id": output.id,
#             "FILE": output.FILE
#         }
#             for output in Files.objects.all()]
#         return Response(output)
