import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ payment_type: '', amount: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/abstract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_type: form.payment_type,
          amount: parseFloat(form.amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al procesar el pago');
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-300 to-purple-200'
      }`}
    >
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Procesador de Pagos</h1>
          <button
            onClick={toggleTheme}
            className="text-sm bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-800"
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <select
            className={`w-full p-3 mb-4 rounded-xl border bg-white text-black 
              placeholder-black dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={form.payment_type}
            onChange={(e) => setForm({ ...form, payment_type: e.target.value })}
            required
          >
            <option value="" disabled hidden>Seleccione tipo de pago</option>
            <option value="tarjeta de credito">Crédito</option>
            <option value="tarjeta debito">Débito</option>
            <option value="paypal">PayPal</option>
          </select>

          <input
            type="number"
            placeholder="Monto"
            className={`w-full p-3 mb-4 rounded-xl border bg-white text-black 
              placeholder-black dark:bg-gray-700 dark:text-white dark:placeholder-white dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
            min="0"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />

          <button className="w-full bg-purple-700 text-white p-3 rounded-xl font-bold hover:bg-purple-900 transition">
            Procesar
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl text-left">
            <p><strong>Tipo de pago:</strong> {response["Tipo de pago"]}</p>
            <p><strong>Monto inicial:</strong> ${response["Monto inicial"]}</p>
            <p><strong>Monto final:</strong> ${response["Monto final"]}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-left">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
