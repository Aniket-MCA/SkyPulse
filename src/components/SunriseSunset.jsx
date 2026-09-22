export default function SunriseSunset({
    weather
}) {

    const sunrise =
        weather.daily.sunrise[0];

    const sunset =
        weather.daily.sunset[0];


    return (

        <div className="highlightCard sunriseCard">

            <h3>
                Sunrise and Sunset
            </h3>


            <div className="sunRow">

                <div className="sunCircle">
                    ↑
                </div>


                <div>

                    <strong>
                        {formatTime(sunrise)}
                    </strong>

                    <p>
                        Sunrise
                    </p>

                </div>

            </div>


            <div className="sunRow">

                <div className="sunCircle">
                    ↓
                </div>


                <div>

                    <strong>
                        {formatTime(sunset)}
                    </strong>

                    <p>
                        Sunset
                    </p>

                </div>

            </div>

        </div>

    );
}


function formatTime(time) {

    return new Date(time).toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}