from decimal import Decimal
from collections import defaultdict

from django.shortcuts import render

from .models import Transaction

def index(request):

    headers = ["Date", "Action", "Asset Name", "Amount (EUR)", "Share Price", 
               "Share Quantity", "Tax Due"]

    all_transactions = Transaction.objects.select_related('action', 'asset').order_by('date')

    all_transactions_with_tax = process_transactions(all_transactions)

    context = {"headers": headers, "transactions": all_transactions_with_tax}

    return render(request, "calculator/index.html", context)

def process_transactions(all_transactions):

    buy_transactions_by_asset = group_transactions_by_asset(all_transactions)

    all_transactions_with_tax = calculate_tax_per_sale(all_transactions, buy_transactions_by_asset)

    return all_transactions_with_tax

def group_transactions_by_asset(transactions):

    buy_transactions_by_asset = defaultdict(list)

    for transaction in transactions:
        if transaction.action.action == "Buy":
            bought_asset_id = transaction.asset.id

            buy_transactions_by_asset[bought_asset_id].append(transaction)
    return buy_transactions_by_asset

def calculate_tax_per_sale(all_transactions, buy_transactions_by_asset):
    for transaction in all_transactions:
        if transaction.action.action == "Sell":
            tax_due = 0
            total_quantity_to_sell = transaction.share_quantity
            sell_asset_id = transaction.asset.id

            # Makes sure the user doesn't try to input more shares than available
            total_quantity_held = sum(buy_transaction.share_quantity
                                      for buy_transaction in
                                      buy_transactions_by_asset.get(sell_asset_id))

            if total_quantity_to_sell > total_quantity_held:
                raise ValueError("You don't have enough shares to sell")

            while total_quantity_to_sell > 0:

                # If the user runs out of buy transactions, exit with the 
                # amount of tax calculated to this point
                if not buy_transactions_by_asset.get(sell_asset_id):
                    break

                earliest_bought_transaction = buy_transactions_by_asset.get(sell_asset_id)[0]

                # If the sell quantitity is more than the bought quantity, 
                # we'll be selling the full bought quantity. Or else we'll be 
                # selling the full sell quantity
                quantity_to_sell = min(earliest_bought_transaction.share_quantity,
                                        total_quantity_to_sell)

                gain_or_loss = (quantity_to_sell * transaction.share_price) - (
                    quantity_to_sell * earliest_bought_transaction.share_price)

                tax_due = tax_due + (gain_or_loss * Decimal(0.41)) if gain_or_loss > 0 else tax_due

                if earliest_bought_transaction.share_quantity <= quantity_to_sell:
                    buy_transactions_by_asset.get(sell_asset_id).pop(0)
                else:
                    earliest_bought_transaction.share_quantity -= quantity_to_sell
                total_quantity_to_sell -= quantity_to_sell
            transaction.tax_due = tax_due
    return all_transactions
