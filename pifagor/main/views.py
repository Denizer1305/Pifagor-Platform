from django.shortcuts import render


def index(request):
    title = {
        "title": "Пифагор - Образовательная платформа нового поколения"
    }

    return render(request, "main/index.html", title)


def about(request):
    title = {
        "title": "Пифагор - О платформе"
    }

    return render(request, "main/about.html", title)

def contact(request):
    title = {
        "title": "Пифагор - Контакты"
    }

    return render(request, "main/contact.html", title)


def teachers(request):
    title = {
        "title": "Пифагор - Преподаватели"
    }
    
    return render(request, "main/teachers.html", title)