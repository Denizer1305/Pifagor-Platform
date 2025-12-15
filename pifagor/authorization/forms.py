from django import forms
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import CustomsUser
import re

class LoginForm(forms.Form):
    email = forms.EmailField(
        label='Электронная почта',
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'example@mail.com',
            'id': 'email'
        })
    )
    password = forms.CharField(
        label='Пароль',
        widget=forms.PasswordInput(attrs={
            'class': 'form-input',
            'placeholder': 'Введите ваш пароль',
            'id': 'password'
        })
    )
    remember_me = forms.BooleanField(
        required=False,
        initial=False,
        widget=forms.CheckboxInput(attrs={
            'id': 'remember'
        })
    )

class RegistrationForm(forms.ModelForm):
    password1 = forms.CharField(
        label='Пароль',
        widget=forms.PasswordInput(attrs={'placeholder': 'Не менее 8 символов'}),
    )
    password2 = forms.CharField(
        label='Подтвердите пароль',
        widget=forms.PasswordInput(attrs={'placeholder': 'Подтвердите пароль'}),
    )

    class Meta:
        model = CustomsUser
        fields = ['name', 'lastname', 'patronymic', 'email', 'role']
        labels = {
            'name': 'Имя',
            'lastname': 'Фамилия',
            'patronymic': 'Отчество',
            'email': 'Электронная почта',
            'role': 'Роль',
        }
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Иван'
            }),
            'lastname': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Иванов'
            }),
            'patronymic': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Иванович'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'example@mail.com'
            }),
            'role': forms.Select(attrs={
                'class': 'form-input'
            }, choices=[
                ('student', 'Студент'),
                ('teacher', 'Преподаватель'),
                ('admin', 'Администратор')
            ])
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError('Некорректный формат email')
        
        if CustomsUser.objects.filter(email=email).exists():
            raise ValidationError('Пользователь с таким email уже существует')
        return email

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        if not password1:
            return password1

        if len(password1) < 8:
            raise ValidationError('Пароль должен содержать не менее 8 символов')
        elif not re.search(r'[A-Z]', password1):
            raise ValidationError("Пароль должен содержать заглавную букву!")
        elif not re.search(r'[0-9]', password1):
            raise ValidationError("Пароль должен содержать цифру!")
        elif not re.search(r'[!@#$%^&*(),.?":{}|<>]', password1):
            raise ValidationError("Пароль должен содержать специальный символ!")
        return password1

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            self.add_error('password2', 'Пароли не совпадают!')

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


# Формы для сброса пароля
class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField(
        label='Электронная почта',
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'example@mail.com',
            'id': 'email'
        })
    )

class PasswordResetCodeForm(forms.Form):
    code = forms.CharField(
        label='Код подтверждения',
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Введите код из email',
            'id': 'code'
        })
    )

class NewPasswordForm(forms.Form):
    password1 = forms.CharField(
        label='Новый пароль',
        widget=forms.PasswordInput(attrs={'placeholder': 'Не менее 8 символов'}),
    )
    password2 = forms.CharField(
        label='Подтвердите пароль',
        widget=forms.PasswordInput(attrs={'placeholder': 'Подтвердите пароль'}),
    )

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        if not password1:
            return password1

        if len(password1) < 8:
            raise ValidationError('Пароль должен содержать не менее 8 символов')
        elif not re.search(r'[A-Z]', password1):
            raise ValidationError("Пароль должен содержать заглавную букву!")
        elif not re.search(r'[0-9]', password1):
            raise ValidationError("Пароль должен содержать цифру!")
        elif not re.search(r'[!@#$%^&*(),.?":{}|<>]', password1):
            raise ValidationError("Пароль должен содержать специальный символ!")
        return password1

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            self.add_error('password2', 'Пароли не совпадают!')

        return cleaned_data