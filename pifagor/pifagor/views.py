from django.views.static import serve
import os
from django.conf import settings


def theme_serve(request, theme_name):
    theme_path = f'css/themes/{theme_name}.css'
    return serve(request, theme_path, document_root=settings.STATIC_ROOT)