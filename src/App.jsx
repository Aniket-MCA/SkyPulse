import { useState } from "react";

import Nav from "./components/nav";
import Forecast from "./components/Forecast";
import WeatherHighlights from "./components/WeatherHighlights";

import { getWeatherData } from "./services/weatherApi";
import default_welcome from "./assets/demo-images/sidebar-default-image.png";
import "./App.css";

export default function App() {

    const [weatherData, setWeatherData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [unit, setUnit] = useState("C");


    async function handleSearch(city) {

        if (!city || city.trim() === "") {
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data = await getWeatherData(city);

            setWeatherData(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    }


    return (

        <div className="app">

            {/* LEFT SIDEBAR */}
            <Nav
                onSearch={handleSearch}
                weather={weatherData?.weather}
                location={weatherData?.location}
                unit={unit}
            />
            


            {/* RIGHT SIDE DASHBOARD */}
            <main className="dashboard">
                {loading && (
                    <div className="message">
                        <div className="loading_spin"></div>
                        Loading weather...
                    </div>
                )}


                {error && (
                    <div className="errorMessage">
                        {error}
                    </div>
                )}


                {!loading && !error && weatherData && (

                    <>

                        <Forecast
                            weather={weatherData.weather}
                            unit={unit}
                            setUnit={setUnit}
                        />


                        <WeatherHighlights
                            weather={weatherData.weather}
                            airQuality={weatherData.airQuality}
                            location={weatherData.location}
                            unit={unit}
                        />

                    </>

                )}


                {!loading && !error && !weatherData && (

                    <div className="welcomeMessage">
                        
                        <h1>Welcome to SkyPulse</h1>

                        <p>
                            Search for a city to see the weather forecast.
                        </p>
                        <img className="searchimg" src={default_welcome}></img>

                    </div>

                )}

            </main>

        </div>
    );
}