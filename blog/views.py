from django.shortcuts import render
from django.http import HttpResponse

posts = [
    {
        'title': 'My favourite games',
        'author': 'Samarth M',
    },
    {
        'title': 'Top 10 games',
        'author': 'Samarth M',
    }
]


def home(request):
    context = {
        'posts': posts
    }
    return render(request, 'blog/home.html', context)


def about(request):
    return render(request, 'blog/about.html')
# Create your views here.
