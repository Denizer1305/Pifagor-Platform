from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib import messages
from django.db import IntegrityError
from .forms import RegistrationForm


def registration(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            try:
                user = form.save()
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({
                        'success': True,
                        'redirect_url': '/authorization/login/',
                        'message': 'Регистрация успешно завершена'
                    })
                else:
                    messages.success(request, 'Регистрация успешно завершена! Теперь вы можете войти в систему.')
                    return redirect('authorization:login')

            except IntegrityError as e:
                error_message = 'Произошла ошибка при регистрации.'

                if 'users_email_key' in str(e) or 'duplicate key value violates unique constraint' in str(e):
                    error_message = 'Пользователь с таким email уже существует.'
                    form.add_error('email', 'Пользователь с таким email уже существует.')
                elif 'users_username_key' in str(e):
                    error_message = 'Пользователь с таким именем уже существует.'
                    form.add_error('username', 'Пользователь с таким именем уже существует.')

                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({
                        'success': False,
                        'errors': {'email': [error_message]}
                    }, status=400)
                else:
                    messages.error(request, error_message)

            except Exception as e:
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({
                        'success': False,
                        'errors': {'__all__': ['Произошла ошибка при сохранении пользователя']}
                    }, status=500)
                else:
                    messages.error(request, 'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.')
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'errors': form.errors
                }, status=400)
            else:
                for field, errors in form.errors.items():
                    for error in errors:
                        messages.error(request, f"{field}: {error}")

    else:
        form = RegistrationForm()

    context = {
        'title': "Пифагор - Регистрация",
        'form': form
    }
    return render(request, "authorization/registration.html", context)


def login(request):
    context = {
        "title": "Пифагор - Вход"
    }
    return render(request, "authorization/login.html", context)


def logout(request):
    context = {
        "title": "Пифагор - Выход"
    }
    return render(request, "authorization/logout.html", context)


def email_notification(request):
    context = {
        "title": "Пифагор - Подтверждение почты"
    }
    return render(request, "authorization/email-notification.html", context)


def new_password(request):
    context = {
        "title": "Пифагор - Создание нового пароля"
    }
    return render(request, "authorization/new-password.html", context)


def password_reset(request):
    context = {
        "title": "Пифагор - Сброс пароля"
    }
    return render(request, "authorization/password-reset.html", context)


def password_reset_code(request):
    context = {
        "title": "Пифагор - Код сброса пароля"
    }
    return render(request, "authorization/password-reset-code.html", context)