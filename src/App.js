import React, { useState } from 'react';
import './App.css';
import './drunk.jpg';

function App() {
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [bloodAlcoholLevel, setBloodAlcoholLevel] = useState(0);

  const numbers = Array.from({ length: 24 }, (_, i) => i + 1);

  const calculateBloodAlcoholLevel = () => {
    
  if (!weight || isNaN(weight)) {
    setBloodAlcoholLevel('0.00');
    return;
  }
  
    const litres = bottles * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = weight / 10;
    const gramsLeft = grams - burning * time;

    

    let result;
    if (gender === 'male') {
      result = gramsLeft / (weight * 0.7);
    } else {
      result = gramsLeft / (weight * 0.6);
    }

    if (result < 0) {
      result = 0;
    }

    setBloodAlcoholLevel(result.toFixed(2));
  };

  
  const handleWeightChange = (e) => {
    const numericInput = e.target.value.replace(/\D/g, ''); 
    if (numericInput === '' || (numericInput >= 1 && numericInput <= 300)) {
      setWeight(numericInput);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Alcometer</h1>
      </div>

      <div className="row">
        <label>Weight (kg)</label>
        <input type="text" value={weight}  onChange={handleWeightChange}/>
      </div>

      <div className="row">
        <label>Gender</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>      

      <div className="row">
        <label>Bottles</label>
        <select value={bottles} onChange={(e) => setBottles(e.target.value)}>
          {numbers.map((bottle) => (
            <option key={bottle} value={bottle}>
              {bottle}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <label>Hours</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {numbers.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <button onClick={calculateBloodAlcoholLevel}>Calculate</button>
      </div>

      <div className="row">
        <h2>Blood Alcohol Level: {bloodAlcoholLevel}</h2>
        
      </div>
    </div>
  );
}

export default App;