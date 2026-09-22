import { useState } from "react";

import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";

import "./forecast.css";


export default function Forecast({
    weather,
    unit,
    setUnit
}) {

    const [mode, setMode] = useState("week");


    if (!weather) {
        return null;
    }


    return (

        <section className="forecastSection">

            <div className="forecastHeader">


                {/* Today / Week */}

                <div className="forecastTabs">

                    <button
                        className={
                            mode === "today"
                                ? "activeTab"
                                : ""
                        }
                        onClick={() => setMode("today")}
                    >
                        Today
                    </button>


                    <button
                        className={
                            mode === "week"
                                ? "activeTab"
                                : ""
                        }
                        onClick={() => setMode("week")}
                    >
                        Week
                    </button>

                </div>


                {/* Celsius / Fahrenheit */}

                <div className="unitButtons">

                    <button
                        className={
                            unit === "C"
                                ? "activeUnit"
                                : ""
                        }
                        onClick={() => setUnit("C")}
                    >
                        °C
                    </button>


                    <button
                        className={
                            unit === "F"
                                ? "activeUnit"
                                : ""
                        }
                        onClick={() => setUnit("F")}
                    >
                        °F
                    </button>

                </div>


            </div>


            {/* Forecast content */}

            {mode === "today" ? (

                <HourlyForecast
                    weather={weather}
                    unit={unit}
                />

            ) : (

                <WeeklyForecast
                    weather={weather}
                    unit={unit}
                />

            )}

        </section>

    );
}