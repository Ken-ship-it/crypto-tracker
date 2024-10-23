import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CoinDetail = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinData(response.data);
        
        const chartResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: '7',
            },
          }
        );
        const prices = chartResponse.data.prices;
        const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
        const data = prices.map(price => price[1]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${response.data.name} Price (Last 7 Days)`,
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{coinData.name} Details</h1>
      <p>Symbol: {coinData.symbol.toUpperCase()}</p>
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>
      <p>Market Cap Rank: {coinData.market_cap_rank}</p>
      <p>All-Time High: ${coinData.market_data.ath.usd}</p>

      <div style={{ width: '600px', margin: '50px auto' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CoinDetail;
