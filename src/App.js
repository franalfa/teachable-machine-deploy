import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
    if (text.includes('love') || text.includes('great')) {
      setSentiment('😊 Positivo');
    } else if (text.includes('hate') || text.includes('bad')) {
      setSentiment('😠 Negativo');
    } else {
      setSentiment('😐 Neutral');
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
    </div>
  );
}

export default App;
