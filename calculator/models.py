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
    action = models.ForeignKey(Action, on_delete=models.PROTECT)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    is_sold = models.BooleanField(default=False)

    @property
    def share_quantity(self):
        return self.amount / self.share_price

    @property
    def gain_loss(self):
        return (self.share_quantity * self.share_price) - self.amount
