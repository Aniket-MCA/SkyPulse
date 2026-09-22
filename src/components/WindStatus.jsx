import { MapPin } from 'lucide-react';



export default function WindStatus({
    weather,
    location,
    unit
}) {

    let wind =
        weather.current.wind_speed_10m;


    if (unit === "F") {
        // Keep wind in km/h even when temperature is °F.
        // This can be changed later to mph.
    }


    return (

        <div className="highlightCard">

            <h3>
                Wind Status
            </h3>


            <div className="bigValue">

                {wind.toFixed(1)}

                <span>
                    km/h
                </span>

            </div>


            <div className="locationText">

                <MapPin color="#287CF0"/>

                <span>
                    {location?.name}, {location?.country}
                </span>

            </div>

        </div>

    );
}