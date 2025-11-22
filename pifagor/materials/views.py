from django.shortcuts import render

def materials(request):
    title = {
        "title": "Пифагор - Учебные материалы"
    }

    return render(request, "materials/materials.html", title)


def materials_list(request):
    title = {
        "title": "Пифагор - Основы программирования"
    }

    return render(request, "materials/matarials-list.html", title)


def materials_create(request):
    title = {
        "title": "Пифагор - Создание материала"
    }

    return render(request, "materials/create-materials-detail.html", title)