import clear from "/src/assets/weather-icons/clear-day.svg";
import cloudy from "../assets/weather-icons/cloudy.svg";
import rain from "../assets/weather-icons/rain.svg";
import fogDay from "../assets/weather-icons/partly-cloudy-day-fog.svg";
import drizzle from "../assets/weather-icons/drizzle.svg";
import snow from "../assets/weather-icons/partly-cloudy-day-snow.svg";
import thunderstorm from "../assets/weather-icons/extreme-thunderstorms.svg";
import "./dailyCard.css";


function getIcon(code ) {


    if ([0, 1].includes(code)) {
        return clear;
    }

    if ([2, 3].includes(code)) {
        return cloudy;
    }

    if ([45, 48].includes(code)) {
        return fogDay;
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
        return drizzle;
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
        return rain;
    }

    if ([71, 73, 75, 77].includes(code)) {
        return snow;
    }

    if ([80, 81, 82].includes(code)) {
        return rain;
    }

    if ([95, 96, 99].includes(code)) {
        return thunderstorm;
    }

    return cloudy;

}


export default function DailyCard({
    date,
    maxTemperature,
    minTemperature,
    weatherCode,
    unit,
    weather,
}) {

    let max = maxTemperature;
    let min = minTemperature;


    if (unit === "F") {

        max = max * 9 / 5 + 32;
        min = min * 9 / 5 + 32;

    }


    return (

        <div className="dailyCard">

            <h3>

                {new Date(date).toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                )}

            </h3>


            <img
                src={getIcon(weatherCode)}
                className="dailyIcon"
                alt="weather"
            />


            <div className="dailyTemperature">

                <strong>
                    {Math.round(max)}°
                </strong>

                <span>
                    {Math.round(min)}°
                </span>

            </div>

        </div>

    );
}