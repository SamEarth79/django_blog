from users.models import User
from django.db import models
from django.utils import timezone

import sys
sys.path.append('../users')


class Files(models.Model):
    FILE = models.FileField(upload_to='files/', null=True)
    uploaded_on = models.DateTimeField(auto_now_add=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user = models.EmailField(max_length=100, null=True)

    def __str__(self):
        return str(self.user)
