from django.db import models


class Files(models.Model):
    FILE = models.FileField(upload_to='files/', null=True)

    def __str__(self):
        return self.FILE
