# Generated by Django 4.1.7 on 2023-04-04 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='files',
            name='filename',
        ),
        migrations.AlterField(
            model_name='files',
            name='FILE',
            field=models.FileField(null=True, upload_to='files/'),
        ),
    ]
