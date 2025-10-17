from django.contrib import admin
from .models import Asset, Action, Transaction

admin.site.register(Asset)
admin.site.register(Action)
admin.site.register(Transaction)
