import unittest
from decimal import Decimal
from payment_service import PaymentSandbox,ProducerOrder,money

class PaymentTests(unittest.TestCase):
    def setUp(self):
        self.p = PaymentSandbox()
        self.orders = [ProducerOrder('farm',Decimal('40.00'),Decimal('3.00')),
                       ProducerOrder('bakery',Decimal('20.00'),Decimal('2.00'))]
    def test_approved(self):
        r=self.p.pay('a',self.orders); self.assertEqual(r['customer_total_gbp'],'65.00'); self.assertEqual(r['marketplace_commission_gbp'],'3.00'); self.assertEqual(r['producer_dues_gbp'],{'farm':'41.00','bakery':'21.00'})
    def test_declined(self): self.assertEqual(self.p.pay('d',self.orders,'declined')['simulated_charge_gbp'],'0.00')
    def test_unavailable(self): self.assertEqual(self.p.pay('u',self.orders,'unavailable')['status'],'UNAVAILABLE')
    def test_idempotent(self): self.assertIs(self.p.pay('a',self.orders),self.p.pay('a',self.orders))
    def test_conflict(self):
        self.p.pay('a',self.orders)
        with self.assertRaises(ValueError): self.p.pay('a',[ProducerOrder('x',Decimal('1'),Decimal('0'))])
    def test_rounding(self): self.assertEqual(self.p.breakdown([ProducerOrder('x',Decimal('0.10'),Decimal('0'))])[0].commission,Decimal('0.01'))
    def test_negative(self):
        with self.assertRaises(ValueError): money('-1.00')
    def test_duplicate_producer(self):
        with self.assertRaises(ValueError): self.p.breakdown(self.orders+self.orders)
if __name__=='__main__': unittest.main()
