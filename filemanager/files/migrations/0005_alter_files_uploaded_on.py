# Generated by Django 4.1.7 on 2023-04-04 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0004_alter_files_uploaded_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='uploaded_on',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
