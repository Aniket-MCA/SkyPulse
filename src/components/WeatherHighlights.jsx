import UVIndex from "./UVIndex";
import WindStatus from "./WindStatus";
import SunriseSunset from "./SunriseSunset";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import AirQuality from "./AirQuality";

import "./WeatherHighlights.css";


export default function WeatherHighlights({
    weather,
    airQuality,
    location,
    unit
}) {

    if (!weather) {
        return null;
    }


    return (

        <section className="highlightsSection">

            <h2>
                Today's Highlight
            </h2>


            <div className="highlightGrid">

                <UVIndex
                    weather={weather}
                />


                <WindStatus
                    weather={weather}
                    location={location}
                    unit={unit}
                />


                <SunriseSunset
                    weather={weather}
                />


                <Humidity
                    weather={weather}
                />


                <Visibility
                    weather={weather}
                />


                <AirQuality
                    airQuality={airQuality}
                />

            </div>

        </section>

    );
}