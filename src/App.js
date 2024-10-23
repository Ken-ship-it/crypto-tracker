import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoList from './CryptoList';
import CoinDetail from './CoinDetail';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <div style={{ padding: '10px', textAlign: 'right' }}>
          <button onClick={toggleDarkMode} style={buttonStyle}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<CryptoList />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
};

export default App;
