from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from main import views
from django.views.static import serve


urlpatterns = [
    path('', views.index, name='index'),

    path('admin/', admin.site.urls),

    path('', include('main.urls')),
]

if settings.DEBUG:
    urlpatterns = [
        path('__debug__/', include('debug_toolbar.urls')),
    ] + urlpatterns
    
    # Правильная обработка статических файлов с MIME типами
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    # Явно указываем MIME тип для JS файлов
    urlpatterns += [
        re_path(r'^static/(?P<path>.*\.js)$', serve, {
            'document_root': settings.STATIC_ROOT,
            'content_type': 'application/javascript'
        }),
    ]
