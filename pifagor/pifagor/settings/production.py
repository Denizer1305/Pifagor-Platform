from .base import *

DEBUG = False

ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'platform_pyth',
        'USER': 'deniska1305',
        'PASSWORD': 'prosto1000!',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_ROOT = BASE_DIR / 'media'