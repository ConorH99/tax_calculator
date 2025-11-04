from django.db import models


class Asset(models.Model):
    name = models.CharField(max_length=255)
    ticker = models.CharField(max_length=5)


class Action(models.Model):
    action = models.CharField(max_length=8)

    def __str__(self):
        return self.action


class Transaction(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    share_quantity = models.DecimalField(max_digits=7, decimal_places=5, default=1.56)
    action = models.ForeignKey(Action, on_delete=models.PROTECT)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)

    @property
    def share_price(self):
        return self.amount / self.share_quantity
