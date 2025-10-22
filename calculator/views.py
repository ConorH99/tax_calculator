from django.shortcuts import render

from .models import Transaction
from .logic import process_transactions

def index(request):

    headers = ["Date", "Action", "Asset Name", "Amount", "Share Price",
               "Share Quantity", "Total Gain", "Tax Due"]

    all_transactions = Transaction.objects.select_related('action', 'asset').order_by('date')

    all_transactions_with_tax = process_transactions(all_transactions)

    context = {"headers": headers, "transactions": all_transactions_with_tax}
    return render(request, "calculator/index.html", context)
