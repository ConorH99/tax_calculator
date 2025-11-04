import json

from django.shortcuts import render, redirect
from django.http import JsonResponse

from .models import Transaction
from .logic import process_transactions, query_asset_names_for_ticker_input
from .forms import NewTransactionForm


def index(request):
    headers = [
        "Date",
        "Action",
        "Asset Name",
        "Ticker",
        "Amount",
        "Share Price",
        "Share Quantity",
        "Total Gain",
        "Tax Due",
    ]

    if request.method == "POST":
        form = NewTransactionForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            return redirect("calculator:index")

    all_transactions = Transaction.objects.select_related("action", "asset").order_by(
        "date"
    )

    all_transactions_with_tax = process_transactions(all_transactions)

    new_transaction_form = NewTransactionForm()

    context = {
        "headers": headers,
        "transactions": all_transactions_with_tax,
        "new_transaction_form": new_transaction_form,
    }
    return render(request, "calculator/index.html", context)


def submit_transaction(request):
    if request.method == "POST":
        try:
            data = request.POST
            print(data)
            return JsonResponse({"Success": "Submission successful"}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"Fail": "Invalid JSON data"}, status=400)
    return JsonResponse({"Fail": "Method not allowed"}, status=405)


def get_stock(request):
    if request.method == "POST":
        try:
            request = json.loads(request.body)
            asset_autocomplete_list = query_asset_names_for_ticker_input(
                request["ticker_content"]
            )
            return JsonResponse(
                {"asset_autocomplete_list": asset_autocomplete_list}, status=200
            )
        except json.JSONDecodeError:
            return JsonResponse({"Fail": "Invalid JSON data"}, status=400)
    return JsonResponse({"Fail": "Method Not Allowed"}, status=405)
