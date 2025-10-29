import json

from django.shortcuts import render
from django.http import JsonResponse

from .models import Transaction
from .logic import process_transactions

def index(request):

    headers = ["Date", "Action", "Asset Name", "Amount", "Share Price",
               "Share Quantity", "Total Gain", "Tax Due"]

    all_transactions = Transaction.objects.select_related('action', 'asset').order_by('date')

    all_transactions_with_tax = process_transactions(all_transactions)

    context = {"headers": headers, "transactions": all_transactions_with_tax}
    return render(request, "calculator/index.html", context)

def submit_transaction(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print(data)
            return JsonResponse({"Success": "Submission successful"}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"Fail": "Invalid JSON data"}, status=400)
    return JsonResponse({"Fail": "Method not allowed"}, status=405)
