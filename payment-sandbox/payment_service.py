"""Deterministic sandbox for DESD Group 41 Use Case 2; never processes real money."""
from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP
from typing import Tuple

PENNY = Decimal('0.01')

def money(value):
    amount = Decimal(str(value))
    if not amount.is_finite() or amount < 0 or amount.as_tuple().exponent < -2:
        raise ValueError('Expected non-negative GBP with at most 2 decimal places')
    return amount.quantize(PENNY)

@dataclass(frozen=True)
class ProducerOrder:
    producer_id: str
    item_subtotal: Decimal
    delivery_fee: Decimal

@dataclass(frozen=True)
class Allocation:
    producer_id: str
    items: Decimal
    delivery: Decimal
    commission: Decimal
    producer_due: Decimal

class PaymentSandbox:
    def __init__(self):
        self._requests = {}

    def breakdown(self, producer_orders):
        orders = tuple(producer_orders)
        if not orders or len({o.producer_id for o in orders}) != len(orders):
            raise ValueError('At least one producer order and unique producer IDs required')
        allocations = []
        for o in orders:
            items, delivery = money(o.item_subtotal), money(o.delivery_fee)
            commission = (items * Decimal('0.05')).quantize(PENNY, rounding=ROUND_HALF_UP)
            allocations.append(Allocation(o.producer_id, items, delivery, commission, items-commission+delivery))
        return tuple(allocations)

    def pay(self, order_reference, producer_orders, scenario='approved'):
        if not isinstance(order_reference,str) or not order_reference.strip():
            raise ValueError('Unique order reference required')
        if scenario not in ('approved','declined','unavailable'):
            raise ValueError('Unknown sandbox scenario')
        allocations = self.breakdown(producer_orders)
        signature = allocations
        if order_reference in self._requests:
            old_signature, old_result = self._requests[order_reference]
            if signature != old_signature:
                raise ValueError('Conflicting payload for existing order reference')
            return old_result
        total = sum((a.items+a.delivery for a in allocations), Decimal('0.00'))
        result = {'order_reference': order_reference,
                  'status': {'approved':'APPROVED','declined':'DECLINED','unavailable':'UNAVAILABLE'}[scenario],
                  'customer_total_gbp': f'{total:.2f}',
                  'marketplace_commission_gbp': f'{sum((a.commission for a in allocations), Decimal("0")):.2f}',
                  'producer_dues_gbp': {a.producer_id:f'{a.producer_due:.2f}' for a in allocations},
                  'simulated_charge_gbp': f'{total if scenario=="approved" else Decimal("0"):.2f}',
                  'real_money_charged': False}
        self._requests[order_reference] = (signature, result)
        return result

# Deliberately excludes orchestration: retry counters, 30-second timers,
# 24-hour expiry, atomic inventory transactions and notification dispatch
# belong in the Camunda/business application process, not this gateway stub.
