from flask import Flask, request, jsonify
from payment.payment_factory import get_factory

app = Flask(__name__)

@app.route('/abstract', methods=['POST'])
def process_payment():
    data = request.get_json()

    if not data or 'payment_type' not in data or 'amount' not in data:
        return jsonify({"error": "Datos inválidos, se requiere 'payment_type' y 'amount'"}), 400

    payment_type = data['payment_type']
    amount = data['amount']

    try:
        factory = get_factory(payment_type)
        payment_method = factory.create_payment_method()
        final_amount = payment_method.process(amount)

        return jsonify({
            "Tipo de pago": payment_type,
            "Monto inicial": amount,
            "Monto final": final_amount
        }), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
