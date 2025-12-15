# pifagor/urls.py
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.http import Http404, HttpResponse
from django.core.exceptions import BadRequest, PermissionDenied
import os

error_handlers = {}


def load_custom_error_handlers():
    try:
        error_app_path = os.path.join(settings.BASE_DIR, 'pifagor_error')

        if os.path.exists(error_app_path):
            from pifagor_error.views import (
                custom_400, custom_401, custom_403, custom_404,
                custom_500, custom_502, custom_503, custom_504
            )

            error_handlers.update({
                400: custom_400,
                401: custom_401,
                403: custom_403,
                404: custom_404,
                500: custom_500,
                502: custom_502,
                503: custom_503,
                504: custom_504,
            })

            print("Кастомные обработчики ошибок загружены")
            return True
        else:
            print("Папка pifagor_error не найдена")
            return False

    except ImportError as e:
        print(f"Ошибка импорта обработчиков: {e}")
        return False


load_custom_error_handlers()

def test_error_page(request, status_code):
    if status_code in error_handlers:
        handler = error_handlers[status_code]

        import inspect
        sig = inspect.signature(handler)

        if len(sig.parameters) == 1:
            return handler(request)
        else:
            exception = None

            if status_code == 400:
                exception = BadRequest(f"Тестовая ошибка {status_code}")
            elif status_code == 403:
                exception = PermissionDenied(f"Тестовая ошибка {status_code}")
            elif status_code == 404:
                exception = Http404(f"Тестовая ошибка {status_code}")

            return handler(request, exception)

    else:
        if status_code == 400:
            raise BadRequest(f"Тестовая ошибка {status_code}")
        elif status_code == 403:
            raise PermissionDenied(f"Тестовая ошибка {status_code}")
        elif status_code == 404:
            raise Http404(f"Тестовая ошибка {status_code}")
        elif status_code == 500:
            1 / 0
        else:
            messages = {
                401: "Требуется авторизация",
                502: "Ошибка шлюза",
                503: "Сервис недоступен",
                504: "Таймаут шлюза",
            }
            return HttpResponse(
                f"Тестовая ошибка {status_code} - {messages.get(status_code, '')}",
                status=status_code
            )


def create_test_functions():
    test_functions = {}

    error_codes = [400, 401, 403, 404, 500, 502, 503, 504]

    for code in error_codes:
        def create_test_func(status_code):
            def test_func(request):
                return test_error_page(request, status_code)

            return test_func

        test_functions[code] = create_test_func(code)

    return test_functions


test_functions = create_test_functions()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('authorization/', include('authorization.urls')),
    path('materials/', include('materials.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        path('test/400/', test_functions[400]),
        path('test/401/', test_functions[401]),
        path('test/403/', test_functions[403]),
        path('test/404/', test_functions[404]),
        path('test/500/', test_functions[500]),
        path('test/502/', test_functions[502]),
        path('test/503/', test_functions[503]),
        path('test/504/', test_functions[504]),
    ]

# Статические файлы
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    from django.views.static import serve

    urlpatterns += [
        path('static/<path:path>', serve, {'document_root': settings.STATIC_ROOT}),
        path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
    ]

if error_handlers:
    handler400 = error_handlers.get(400)
    handler401 = error_handlers.get(401)
    handler403 = error_handlers.get(403)
    handler404 = error_handlers.get(404)
    handler500 = error_handlers.get(500)
    handler502 = error_handlers.get(502)
    handler503 = error_handlers.get(503)
    handler504 = error_handlers.get(504)
else:
    from django.views.defaults import (
        bad_request, permission_denied, page_not_found, server_error
    )

    handler400 = bad_request
    handler403 = permission_denied
    handler404 = page_not_found
    handler500 = server_error
    handler401 = permission_denied
    handler502 = server_error
    handler503 = server_error
    handler504 = server_error