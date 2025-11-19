from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomsUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomsUser(AbstractBaseUser, PermissionsMixin):
    users_id = models.AutoField(primary_key=True)
    fullname = models.CharField('Полное имя', max_length=255)
    email = models.EmailField('Email', unique=True)
    password = models.CharField('Пароль', max_length=255)
    role = models.CharField('Роль', max_length=20, default='student')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    phone = models.CharField('Телефон', max_length=20, blank=True, null=True)
    avatar_url = models.URLField('URL аватара', max_length=500, blank=True, null=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    objects = CustomsUserManager()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.fullname
    
    def get_full_name(self):
        return self.fullname
    
    def get_full_name(self):
        return self.fullname
    
    def get_short_name(self):
        return self.fullname

    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser