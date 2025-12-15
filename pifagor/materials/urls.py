from django.urls import path
from . import views

app_name = 'materials'

urlpatterns = [
    path('', views.materials, name="materials"),
    path('materials-lits/', views.materials_list, name="materials-list"),
    path('materials-create/', views.materials_create, name="materials-create"),
]
