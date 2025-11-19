from django import forms
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import CustomsUser
import re

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
        fields = ['fullname', 'email', 'password1', 'password2', 'role']
        labels = {
            'fullname': 'Полное имя',
            'email': 'Электронная почта',
            'role': 'Роль',
        }
        widgets = {
            'fullname': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Иванов Иван Иванович'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'example@mail.com'
            }),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        validate_email(email)
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
        else:
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