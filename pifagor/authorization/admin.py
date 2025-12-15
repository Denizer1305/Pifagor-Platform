from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomsUser

class CustomsUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'lastname', 'patronymic', 'role', 'it_status', 'is_staff', 'created_at')
    list_filter = ('role', 'it_status', 'is_staff', 'created_at')
    search_fields = ('email', 'name', 'lastname', 'patronymic')
    ordering = ('-created_at',)

    fieldsets = (
        (None, {'fields': ('email', 'password_hash')}),
        ('Персональная информация', {'fields': ('name', 'lastname', 'patronymic', 'phone')}),
        ('Права доступа', {'fields': ('role', 'it_status', 'is_staff', 'is_superuser')}),
        ('Важные даты', {'fields': ('last_login', 'created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'lastname', 'patronymic', 'password1', 'password2', 'role', 'it_status', 'is_staff', 'is_superuser')
        }),
    )

    readonly_fields = ('created_at', 'last_login')

    # Исправление полей для формы добавления пользователя
    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)

admin.site.register(CustomsUser, CustomsUserAdmin)