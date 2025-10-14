from django.db import models

class Asset(models.Model):
    name = models.CharField(max_length=255)
    ticker = models.CharField(max_length=5)

class Action(models.Model):
    action = models.CharField(max_length=8)

class Transaction(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    share_price = models.DecimalField(max_digits=5, decimal_places=2)
    action_id = models.ForeignKey(Action, on_delete=models.PROTECT)
    asset_id = models.ForeignKey(Asset, on_delete=models.CASCADE)