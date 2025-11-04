from django import forms

from .models import Action


class NewTransactionForm(forms.Form):
    date = forms.DateField()
    action = forms.ModelChoiceField(queryset=Action.objects.all())
    ticker = forms.CharField(max_length=5)
    asset_name = forms.CharField(
        max_length=255,
        widget=forms.TextInput(
            attrs={
                "readonly": True,
                "tabindex": "-1",
                "class": "bg-gray-100 cursor-default",
            }
        ),
    )
    amount = forms.DecimalField(max_digits=7, decimal_places=2)
    share_quantity = forms.DecimalField(max_digits=7, decimal_places=5)
