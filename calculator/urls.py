from django.urls import path
from . import views

app_name = "calculator"

urlpatterns = [
    path("", views.index),
    path("submit_transaction/", views.submit_transaction, name="submit_transaction"),
]
