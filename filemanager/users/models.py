from django.db import models


class User(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    conf_password = models.CharField(max_length=100)
    phone = models.BigIntegerField()

    def __str__(self):
        return self.email
