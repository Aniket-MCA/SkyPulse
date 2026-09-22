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
import "./hourlyCard.css";


function getIcon(code, time) {
 const hour = new Date(time).getHours();

    const night = hour < 6 || hour >= 19;

    
    if (code === 0 ) {
        return night ? clearNight : clear;
    }
    if(code === 1) {
        return night? partly_cloudNight : partly_cloudDay;
    }

    if(code === 3){
        return cloudy;
    }

    if(code === 45 || code === 48 ){
        return night? fognight : fogDay;
    }

    if(code >= 51 && code <= 57){
        return drizzle;
    }

    if (
        (code >= 61 && code <= 67)
    ) {
        return rain;
    }
    if ( code >=80 && code <= 82){
        return night ? mostly_clear_night_rain : mostly_clear_day_rain;
    }
    if (code >= 95) {
        return extreme_rain;
    }
    return cloudy;
}


export default function HourlyCard({
    time,
    temperature,
    weatherCode,
    rainProbability,
    windSpeed,
    unit,
    weather
}) {

    let temp = temperature;

    if (unit === "F") {
        temp = temperature * 9 / 5 + 32;
    }


    return (

        <div className="hourlyCard">

            <p className="hourTime">

                {new Date(time).toLocaleTimeString(
                    "en-US",
                    {
                        hour: "numeric"
                    }
                )}

            </p>


            <img
                src={getIcon(weatherCode, time)}
                alt="weather"
                className="hourlyIcon"
            />


            <h3>
                {Math.round(temp)}°
            </h3>


            <p className="rainChance">

                💧 {rainProbability}%

            </p>

        </div>

    );
}