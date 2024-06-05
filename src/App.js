import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ccebf3db3c7245a7b2e81525240506&q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeatherData}>Search</button>
      {loading && <p>Loading data…</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (<div>

      <div>
        <h2>{weatherData.location.name}</h2>
      </div>
      <div>
        <p>Temperature: {weatherData.current.temp_c} °C</p>
      </div>
      <div>
        <p>Humidity: {weatherData.current.humidity} %</p>
      </div>
      <div>
        <p>Condition: {weatherData.current.condition.text}</p>
      </div>
      <div>
        <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
      </div>
      </div>
)}

    </div>
  );
};

export default App;
