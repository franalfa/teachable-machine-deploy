import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    setSentiment(null);
    setError(null);

    try {
      const response = await fetch('https://sentiment-backend-v2h9.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Error del servidor');
      }

      const data = await response.json();

      // Mostrar con emoji
      let emoji = '😐';
      if (data.sentiment === 'positive') emoji = '😊';
      else if (data.sentiment === 'negative') emoji = '😠';

      setSentiment(`${emoji} ${data.sentiment.charAt(0).toUpperCase() + data.sentiment.slice(1)}`);
    } catch (err) {
      setError('No se pudo conectar con el backend');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Análisis de Sentimientos</h1>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un texto para analizar..."
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={analyzeSentiment}>Analizar</button>
      {sentiment && (
        <div style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
          Resultado: {sentiment}
        </div>
      )}
      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
