import React, { useState } from 'react';
import './Weather.css'
import { FaLinkedin } from 'react-icons/fa';

const api = {
  key: 'eec4225172e4aec0f8dcedfe84f78b9c',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
      console.log('Fetching URL:', url); // Log the URL to check if it's correct
      
      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(result => {
          setWeather(result);
          setQuery(''); // Clear the search box
          setError(''); // Clear any previous errors
          console.log(result); // Log the result for debugging
        })
        .catch(err => {
          setError('Failed to fetch weather data. Please check your API key or city name.');
          console.error("Error fetching the weather data:", err);
        });
    }
  };
const dateBuilder=(d)=>{
 let months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
 let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 let day=days[d.getDay()]
 let date=d.getDate();
 let month=months[d.getMonth()];
 let year=d.getFullYear();
 return `${day} ${date} ${month} ${year}`
}
  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main!="undefined")?(
        <div className='location-box' >
        <div className='location'>
         <h3>{weather.name}, {weather.sys.country}</h3>
         </div>
         <div className='date'>
           {dateBuilder(new Date())}
         </div>
         <div className='weather-box'>
           <div className="temp">
           <p>{Math.round(weather.main.temp)}°C</p>
           </div>
           <div className="weather">
           <p>{weather.weather[0].description}</p>
           </div>
    
           
 
         </div>
     
       </div>
       
        ):('')}
        
          
        
      </main>
     
      <footer>
        <p>Made by Mohit Sharma</p>
        <p>Connect with me</p>
        <a href="https://www.linkedin.com/in/mohit-sharma-b25868246/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn Profile
        </a>
        <p>© 2024 All rights reserved.</p>
        <p>Any queries? Contact <a href="mailto:sharmmohit29@gmail.com">sharmmohit29@gmail.com</a></p>
      </footer>
    </div>
  );
};

export default Weather;

