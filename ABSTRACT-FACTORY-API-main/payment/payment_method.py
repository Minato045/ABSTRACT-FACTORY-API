from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def process(self, amount: float) -> float:
        pass

class CreditCardPayment(PaymentMethod):
    def process(self, amount: float) -> float:
        commission_rate = 0.03
        final_amount = amount + (amount * commission_rate)
        if amount > 1000:
            final_amount += 10
        return final_amount

class DebitCardPayment(PaymentMethod):
    def process(self, amount: float) -> float:
        commission_rate = 0.01
        final_amount = amount + (amount * commission_rate)
        if amount > 500:
            final_amount += 5
        return final_amount

class PayPalPayment(PaymentMethod):
    def process(self, amount: float) -> float:
        commission_rate = 0.05
        final_amount = amount + (amount * commission_rate)
        if amount < 100:
            final_amount += 2
        return final_amount
