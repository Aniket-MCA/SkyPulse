export default function Humidity({
    weather
}) {

    const humidity =
        weather.current.relative_humidity_2m;


    return (

        <div className="highlightCard">

            <h3>
                Humidity
            </h3>


            <div className="bigValue">

                {humidity}

                <span>%</span>

            </div>


            <p className="statusText">

                Status:

                <strong className={`status ${getHumidityStatus(humidity).toLowerCase()}`}>
                    {getHumidityStatus(humidity)}
                </strong>

            </p>

        </div>

    );
}


function getHumidityStatus(value) {

    if (value < 30) {
        return " Low";
    }

    if (value <= 60) {
        return " Good";
    }

    if (value <= 70) {
        return " Moderate";
    }

    return " High";
}