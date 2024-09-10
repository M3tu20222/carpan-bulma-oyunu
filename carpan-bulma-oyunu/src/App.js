import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [foundFactors, setFoundFactors] = useState([]);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const newNumber = Math.floor(Math.random() * 90) + 10; // 10 to 99
    setNumber(newNumber);
    setFoundFactors([]);
    setFeedback('');
  };

  const findFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = parseInt(userInput);
    if (isNaN(input)) {
      setFeedback('Lütfen geçerli bir sayı girin.');
    } else if (number % input === 0 && !foundFactors.includes(input)) {
      setFoundFactors([...foundFactors, input]);
      setFeedback('Doğru! Bu bir çarpan.');
      if (foundFactors.length + 1 === findFactors(number).length - 2) { // -2 to exclude 1 and the number itself
        setFeedback('Tebrikler! Tüm çarpanları buldunuz. Yeni sayı oluşturuluyor...');
        setTimeout(generateNewNumber, 3000);
      }
    } else if (foundFactors.includes(input)) {
      setFeedback('Bu çarpanı zaten buldunuz. Başka bir çarpan deneyin.');
    } else {
      setFeedback('Üzgünüm, bu bir çarpan değil. Tekrar deneyin.');
    }
    setUserInput('');
  };

  return (
    <div className="App">
      <h1>Çarpan Bulma Oyunu</h1>
      <p>Sayı: {number}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Bir çarpan girin"
        />
        <button type="submit">Kontrol Et</button>
      </form>
      <p>{feedback}</p>
      <p>Bulunan Çarpanlar: {foundFactors.join(', ')}</p>
      <button onClick={generateNewNumber}>Yeni Sayı</button>
    </div>
  );
}

export default App;
