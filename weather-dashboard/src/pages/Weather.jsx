import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = '6d6934df04c888605f64fe03a9bd36c9'; 

function Weather() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError('');
        setWeather(null);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) {
          throw new Error('City not found');
        }
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Weather in {city}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!weather && !error && <p>Loading...</p>}
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>

          {/* Bonus: Embed Google Map */}
          <iframe
            title="map"
            width="600"
            height="450"
            style={{ border: 0, marginTop: '1rem' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${city}`}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Weather;
