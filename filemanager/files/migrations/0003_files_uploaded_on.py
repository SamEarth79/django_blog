# Generated by Django 4.1.7 on 2023-04-04 20:20

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0002_remove_files_filename_alter_files_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='files',
            name='uploaded_on',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
