from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token


@requires_csrf_token
def custom_400(request, exception=None):
    context = {
        'error_code': 400,
        'error_title': 'Неверный запрос',
        'error_message': str(exception) if exception else 'Сервер не может обработать ваш запрос',
    }
    return render(request, 'error/400.html', context, status=400)


@requires_csrf_token
def custom_401(request, exception=None):
    context = {
        'error_code': 401,
        'error_title': 'Требуется авторизация',
        'error_message': str(exception) if exception else 'Для доступа к этой странице требуется войти в систему',
    }
    return render(request, 'error/401.html', context, status=401)


@requires_csrf_token
def custom_403(request, exception=None):
    context = {
        'error_code': 403,
        'error_title': 'Доступ запрещен',
        'error_message': str(exception) if exception else 'У вас нет прав для доступа к этой странице',
    }
    return render(request, 'error/403.html', context, status=403)


@requires_csrf_token
def custom_404(request, exception=None):
    context = {
        'error_code': 404,
        'error_title': 'Страница не найдена',
        'error_message': str(exception) if exception else 'Запрашиваемая страница не существует',
        'request_path': request.path,
    }
    return render(request, 'error/404.html', context, status=404)


@requires_csrf_token
def custom_500(request):
    context = {
        'error_code': 500,
        'error_title': 'Внутренняя ошибка сервера',
        'error_message': 'На сервере произошла непредвиденная ошибка',
    }
    return render(request, 'error/500.html', context, status=500)


@requires_csrf_token
def custom_502(request, exception=None):
    context = {
        'error_code': 502,
        'error_title': 'Ошибка шлюза',
        'error_message': str(exception) if exception else 'Сервер получил недопустимый ответ от вышестоящего сервера',
    }
    return render(request, 'error/502.html', context, status=502)


@requires_csrf_token
def custom_503(request, exception=None):
    context = {
        'error_code': 503,
        'error_title': 'Сервис недоступен',
        'error_message': str(exception) if exception else 'Сервер временно не может обработать запрос',
    }
    return render(request, 'error/503.html', context, status=503)


@requires_csrf_token
def custom_504(request, exception=None):
    context = {
        'error_code': 504,
        'error_title': 'Таймаут шлюза',
        'error_message': str(exception) if exception else 'Сервер не получил ответ от вышестоящего сервера вовремя',
    }
    return render(request, 'error/504.html', context, status=504)