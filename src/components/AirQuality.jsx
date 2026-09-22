export default function AirQuality({
    airQuality
}) {

    if (!airQuality) {
        return null;
    }


    const aqi =
        airQuality.current.us_aqi;


    return (

        <div className="highlightCard">

            <h3>
                Air Quality
            </h3>


            <div className="bigValue">

                {Math.round(aqi)}

            </div>


            <p className="statusText">

                Status:

                <strong className={`status ${getAQIStatus(aqi).toLowerCase()}`}>
                    {getAQIStatus(aqi)}
                </strong>

            </p>

        </div>

    );
}


function getAQIStatus(aqi) {

    if (aqi <= 50) {
        return " Good";
    }

    if (aqi <= 100) {
        return " Moderate";
    }

    if (aqi <= 150) {
        return " Unhealthy for Sensitive Groups";
    }

    if (aqi <= 200) {
        return " Unhealthy";
    }

    if (aqi <= 300) {
        return " Very Unhealthy";
    }

    return " Hazardous";
}