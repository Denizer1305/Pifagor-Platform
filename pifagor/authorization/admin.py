from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomsUser

class CustomsUserAdmin(UserAdmin):
    # Поля, которые будут отображаться в списке пользователей
    list_display = ('email', 'fullname', 'role', 'is_staff', 'is_active', 'created_at')
    
    # Поля для фильтрации
    list_filter = ('role', 'is_staff', 'is_active', 'created_at')
    
    # Поля для поиска
    search_fields = ('email', 'fullname')
    
    # Порядок полей в форме редактирования
    ordering = ('-created_at',)
    
    # Группировка полей в форме редактирования
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Персональная информация', {'fields': ('fullname', 'phone', 'avatar_url')}),
        ('Права доступа', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Важные даты', {'fields': ('last_login', 'created_at')}),
    )
    
    # Поля при создании пользователя
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'fullname', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )
    
    # Только для чтения поля
    readonly_fields = ('created_at', 'last_login')

# Регистрируем модель в админ-панели
admin.site.register(CustomsUser, CustomsUserAdmin)
