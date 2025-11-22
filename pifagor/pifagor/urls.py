from django.contrib import admin
from django.urls import include, path
from . import settings, views
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('theme/<str:theme_name>/', views.theme_serve, name='theme_serve'),
    path('', include('main.urls')),
    path('authorization/', include('authorization.urls')),
    path('materials/', include('materials.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
