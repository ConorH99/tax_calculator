from django.urls import path
from . import views

app_name = "calculator"

urlpatterns = [
    path("", views.index, name="index"),
    path("submit_transaction/", views.submit_transaction, name="submit_transaction"),
    path("get_stock/", views.get_stock, name="get_stock"),
]
