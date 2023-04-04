from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilesViewsets

router = DefaultRouter()
router.register('files', FilesViewsets, basename='files')

urlpatterns = [
    path('', include(router.urls)),
]
