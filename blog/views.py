from django.shortcuts import render
from django.http import HttpResponse
from .models import Post

posts = [
    {
        'title': 'My favourite games',
        'author': 'Samarth M',
    },
    {
        'title': 'Top 10 FPS games',
        'author': 'Samarth M',
    }
]


def home(request):
    context = {
        'posts': Post.objects.all()
    }
    return render(request, 'blog/home.html', context)


def about(request):
    return render(request, 'blog/about.html')
# Create your views here.
