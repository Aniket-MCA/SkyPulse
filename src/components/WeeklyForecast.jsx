import DailyCard from "./DailyCard";

import "./weeklyForecast.css";


export default function WeeklyForecast({
    weather,
    unit
}) {

    return (

        <div className="weeklyForecast">

            {weather.daily.time.map(
                (date, index) => (

                    <DailyCard
                        key={date}
                        date={date}
                        weather={weather}
                        maxTemperature={
                            weather.daily
                                .temperature_2m_max[
                                    index
                                ]
                        }
                        minTemperature={
                            weather.daily
                                .temperature_2m_min[
                                    index
                                ]
                        }
                        weatherCode={
                            weather.daily
                                .weather_code[
                                    index
                                ]
                        }
                        rainProbability={
                            weather.daily
                                .precipitation_probability_max[
                                    index
                                ]
                        }
                        unit={unit}
                    />

                )
            )}

        </div>

    );
}