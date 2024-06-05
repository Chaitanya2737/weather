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
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=Your_API_KEY&q=${city}`);
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
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>{weatherData.location.name}</h2>
            <p>Temperature: {weatherData.current.temp_c} °C</p>
            <p>Humidity: {weatherData.current.humidity} %</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
