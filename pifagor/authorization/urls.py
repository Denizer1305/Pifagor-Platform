from django.urls import path
from . import views

app_name = 'authorization'

urlpatterns = [
    path('', views.registration, name='registration'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('email-notification/', views.email_notification, name='email-notification'),
    path('new-password/', views.new_password, name='new-password'),
    path('password-reset/', views.password_reset, name='password-reset'),
    path('password-reset-code/', views.password_reset_code, name='password-reset-code'),
]