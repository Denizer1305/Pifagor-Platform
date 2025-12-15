from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password

class CustomsUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Необходимо указать адрес электронной почты')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('it_status', True)
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomsUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField('Имя', max_length=255)
    lastname = models.CharField('Фамилия', max_length=255)
    patronymic = models.CharField('Отчество', max_length=255)
    email = models.EmailField('Email', unique=True)
    password_hash = models.CharField('Хэш пароля', max_length=255)
    role = models.CharField('Роль', max_length=20, default='student')
    it_status = models.BooleanField('IT статус', default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    phone = models.CharField('Телефон', max_length=20, blank=True, null=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'lastname', 'patronymic']

    objects = CustomsUserManager()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.get_full_name()

    def get_full_name(self):
        return f"{self.lastname} {self.name} {self.patronymic}"

    def get_short_name(self):
        return f"{self.name} {self.lastname}"

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)
        
    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_active(self):
        return self.it_status