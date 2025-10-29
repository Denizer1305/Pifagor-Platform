from django.shortcuts import render


def index(request):
    context = {
        'title': 'Образовательная платформа нового поколения',
    }
    return render(request, 'main/index.html', context)


def about(request):
    context = {
        'title': 'Пифагор - О платформе'
    }
    return render(request, 'main/about.html', context)


def contact(request):
    context = {
        'title': 'Пифагор - Контакты'
    }
    return render(request, 'main/contact.html', context)


def teachers(request):
    context = {
        'title': 'Пифагор - Преподаватели'
    }
    return render(request, 'main/teachers.html', context)