from abc import ABC, abstractmethod
from .payment_method import CreditCardPayment, DebitCardPayment, PayPalPayment, PaymentMethod

class PaymentFactory(ABC):
    @abstractmethod
    def create_payment_method(self) -> PaymentMethod:
        pass

class CreditCardPaymentFactory(PaymentFactory):
    def create_payment_method(self) -> PaymentMethod:
        return CreditCardPayment()

class DebitCardPaymentFactory(PaymentFactory):
    def create_payment_method(self) -> PaymentMethod:
        return DebitCardPayment()

class PayPalPaymentFactory(PaymentFactory):
    def create_payment_method(self) -> PaymentMethod:
        return PayPalPayment()

# Factory principal para elegir según tipo de pago
def get_factory(payment_type: str) -> PaymentFactory:
    factories = {
        "tarjeta de credito": CreditCardPaymentFactory(),
        "tarjeta debito": DebitCardPaymentFactory(),
        "paypal": PayPalPaymentFactory(),
    }
    factory = factories.get(payment_type.lower())
    if not factory:
        raise ValueError(f"Tipo de pago '{payment_type}' no soportado.")
    return factory
