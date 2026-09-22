import { useEffect, useState } from "react";

import clear from "../assets/weather-icons/clear-day.svg";
import cloudy from "../assets/weather-icons/cloudy.svg";
import rain from "../assets/weather-icons/rain.svg";
import clearNight from "../assets/weather-icons/clear-night.svg";
import partly_cloudDay from "../assets/weather-icons/mostly-clear-day.svg"; 
import partly_cloudNight from "../assets/weather-icons/mostly-clear-night.svg";
import drizzle from "../assets/weather-icons/drizzle.svg";
import mostly_clear_night_rain from "../assets/weather-icons/mostly-clear-night-rain.svg";
import extreme_rain from "../assets/weather-icons/extreme-thunderstorms-extreme-rain.svg";
import fogDay from "../assets/weather-icons/partly-cloudy-day-fog.svg";
import fognight from "../assets/weather-icons/partly-cloudy-night-fog.svg";

import mostly_clear_day_rain from "../assets/weather-icons/partly-cloudy-night-fog.svg";
import CityCard from "./cityCard.jsx";
import "./currentWeather.css";
import default_welcome from "../assets/demo-images/sidebar-default-image.png";

// import sidebar_default from "../assets/demo-images/sidebar-default-image.png";


function getLocalTime(timezone) {
  if (!timezone) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}


function getCityHour(timezone) {
  if (!timezone) {
    return new Date().getHours();
  }

  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  );
}


function getWeatherIcon(code, hour) {
  const night = hour < 6 || hour >= 19;


  if (code === 0) {
    return night ? clearNight : clear;
  }


  if (code === 1) {
    return night ? partly_cloudNight : partly_cloudDay;
  }


  if (code === 2) {
    return night ? partly_cloudNight : partly_cloudDay;
  }


  if (code === 3) {
    return cloudy;
  }


  if (code === 45 || code === 48) {
    return night ? fognight : fogDay;
  }


  if (code >= 51 && code <= 57) {
    return drizzle;
  }


  if (code >= 61 && code <= 67) {
    return rain;
  }


  if (code >= 80 && code <= 82) {
    return night ? mostly_clear_night_rain : mostly_clear_day_rain;
  }


  if (code >= 95) {
    return extreme_rain;
  }

  return cloudy;
}



function getWeatherDescription(code) {
  if (code === 0) {
    return "Clear Sky";
  }

  if (code === 1 || code === 2) {
    return "Partly Cloudy";
  }

  if (code === 3) {
    return "Overcast";
  }

  if (code === 45 || code === 48) {
    return "Fog";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 82) {
    return "Rain Showers";
  }

  if (code >= 95) {
    return "Thunderstorm";
  }

  return "Cloudy";
}



function getCurrentHourIndex(weather) {
  if (!weather || !weather.current || !weather.hourly || !weather.hourly.time) {
    return 0;
  }

  const currentTime = new Date(weather.current.time).getTime();

  let closestIndex = 0;

  let smallestDifference = Infinity;

  weather.hourly.time.forEach((time, index) => {
    const difference = Math.abs(new Date(time).getTime() - currentTime);

    if (difference < smallestDifference) {
      smallestDifference = difference;

      closestIndex = index;
    }
  });

  return closestIndex;
}


export default function CurrentWeather({ weather, location, unit }) {
const [time, setTime] = useState(getLocalTime(weather?.timezone));



useEffect(() => {

    if (!weather?.timezone) {
        return;
    }

    function updateTime() {
        setTime(getLocalTime(weather.timezone));
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => {
        clearInterval(interval);
    };

}, [weather?.timezone]);

    if (!weather?.current || !location)  {
        return (
            <div className="currentWeather defaultWeather">

                <img
                    src={default_welcome}
                    className="searchimg"
                    alt="Welcome to SkyPulse"
                />

            </div>
        );
    }
  const current = weather.current;

  const cityHour = getCityHour(weather.timezone);

  let temperature = current.temperature_2m;

  if (unit === "F") {
    temperature = (temperature * 9) / 5 + 32;
  }


  const currentHourIndex = getCurrentHourIndex(weather);

  const rainProbability =
    weather.hourly?.precipitation_probability?.[currentHourIndex] ?? 0;



  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: weather.timezone,
    weekday: "long",
  }).format(new Date());


  const weatherIcon = getWeatherIcon(current.weather_code, cityHour);



  const weatherDescription = getWeatherDescription(current.weather_code);


  return (
    <div className="currentWeather">
      <div className="section1">
        <img
          src={weatherIcon}
          className="mainWeatherIcon"
          alt={weatherDescription}
        />

        <h1>
          {Math.round(temperature)}°<span>{unit}</span>
        </h1>


        <p className="currentDate">
          {weekday}

          <span> {time}</span>
        </p>


        <div className="weatherStatus">

          <p>
            <img src={cloudy} alt="" />

            {weatherDescription}
          </p>

          <p>
            <img src={rain} alt="" />
            Rain - {rainProbability}%
          </p>
        </div>
      </div>
      <div className="section2">
      <CityCard city={location.name} country={location.country} />
      </div>
    </div>
  );
}
