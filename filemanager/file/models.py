from django.db import models


class File(models.Model):
    filename = models.CharField(max_length=100)
    extension = models.CharField(max_length=100)
