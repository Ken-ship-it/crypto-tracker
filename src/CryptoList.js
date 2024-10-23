import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [page, setPage] = useState(1); // New state for pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: currency,
              order: 'market_cap_desc',
              per_page: 50, // Fetching 50 coins per page
              page: page,  // Fetch based on the current page number
              sparkline: false,
            },
          }
        );
        setCoins(prevCoins => [...prevCoins, ...response.data]); // Append new coins
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currency, page]); // Fetch data when the currency or page changes

  const loadMoreCoins = () => {
    setPage(prevPage => prevPage + 1); // Load the next page of coins
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && page === 1) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>

      <select 
        onChange={(e) => setCurrency(e.target.value)} 
        value={currency}
        style={{ padding: '10px', marginBottom: '20px', fontSize: '16px' }}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="gbp">GBP</option>
        <option value="jpy">JPY</option>
        <option value="inr">INR</option>
      </select>

      <input
        type="text"
        placeholder="Search for a coin"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        style={{ padding: '10px', marginBottom: '20px', width: '300px', fontSize: '16px' }}
      />

      <ul>
        {filteredCoins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol.toUpperCase()}) - {currency.toUpperCase()} {coin.current_price}
            </Link>
            <br />
            Market Cap: {coin.market_cap.toLocaleString()}
          </li>
        ))}
      </ul>

      {/* Load More Button */}
      <button onClick={loadMoreCoins} style={loadMoreButtonStyle}>
        Load More
      </button>
    </div>
  );
};

// Style for the "Load More" button
const loadMoreButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '20px',
  borderRadius: '5px',
};

export default CryptoList;
