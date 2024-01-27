import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [searching, setSearching] = useState(false);
  const apikey = "26989cea638ba7b20befd8df7da04a2a";

  const search = async () => {
    const cityInput = document.querySelector(".SearchInput");
    if (cityInput.value === "") {
      // Clear existing data and error when search bar is empty
      setWeatherData(null);
      setError(null);
      setSearching(false);
      return;
    }

    setSearching(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apikey}`;

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log("Weather Icon:", data.weather[0].icon); // Log the icon to the console

      // Set the weather icon dynamically
      setWeatherIcon(data.weather[0].icon);

      // Set weather data and clear any existing error
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Clear existing weather data and set error when there's an issue
      setWeatherData(null);
      setError("City not found");
    } finally {
      setSearching(false);
    }
  };

  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
        setWicon(rain_icon);
        break;
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(clear_icon);
        break;
    }
  };

  return (
    <div className={`container ${searching ? 'searching' : ''} ${weatherData || error ? 'data-available' : ''}`}>
      <div className='Search-bar'>
        <input type="text" className='SearchInput' placeholder='Search'></input>
        <div className='Search-icon' onClick={() => { search() }}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      {weatherData && (
        <>
          <div className='Weather-image'>
            <img src={wicon} alt='Weather' />
          </div>
          <div className='weather-temp'>{Math.round(weatherData.main.temp)}°C</div>
          <div className='weather-location'>{weatherData.name}</div>
          <div className='Data-container'>
            <div className='Element'>
              <img src={humidity_icon} alt="Humidity" className='icon' />
              <div className='data'>
                <div className='Humidity-per'>{Math.round(weatherData.main.humidity)}%</div>
                <div className='text'>Humidity</div>
              </div>
            </div>
            <div className='Element'>
              <img src={wind_icon} alt="Wind Speed" className='icon' />
              <div className='data'>
                <div className='Wind-speed'>{Math.round(weatherData.wind.speed)} Km/h</div>
                <div className='text'>Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
