import HourlyCard from "./HourlyCard";

import "./hourlyForecast.css";


export default function HourlyForecast({
    weather,
    unit
}) {

    const currentTime =
        new Date(weather.current.time).getTime();


    let currentIndex = 0;

    let smallestDifference = Infinity;


    weather.hourly.time.forEach(
        (time, index) => {

            const difference =
                Math.abs(
                    new Date(time).getTime() -
                    currentTime
                );


            if (difference < smallestDifference) {

                smallestDifference =
                    difference;

                currentIndex =
                    index;

            }

        }
    );


    const hours =
        weather.hourly.time.slice(
            currentIndex,
            currentIndex + 24
        );


    return (

        <div className="hourlyForecast">

            {hours.map((time, index) => {

                const actualIndex =
                    currentIndex + index;


                return (

                    <HourlyCard
                        key={time}
                        time={time}
                        weather={weather}
                        temperature={
                            weather.hourly
                                .temperature_2m[
                                    actualIndex
                                ]
                        }
                        weatherCode={
                            weather.hourly
                                .weather_code[
                                    actualIndex
                                ]
                        }
                        rainProbability={
                            weather.hourly
                                .precipitation_probability[
                                    actualIndex
                                ]
                        }
                        windSpeed={
                            weather.hourly
                                .wind_speed_10m[
                                    actualIndex
                                ]
                        }
                        unit={unit}
                    />

                );

            })}

        </div>

    );
}