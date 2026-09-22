export default function Visibility({
    weather
}) {

    const currentTime =
        new Date(weather.current.time).getTime();


    let closestIndex = 0;
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

                closestIndex =
                    index;

            }

        }
    );


    const visibilityMeters =
        weather.hourly.visibility[
            closestIndex
        ];


    const visibilityKm =
        visibilityMeters / 1000;


    return (

        <div className="highlightCard">

            <h3>
                Visibility
            </h3>


            <div className="bigValue">

                {visibilityKm.toFixed(1)}

                <span>
                    km
                </span>

            </div>


            <p className="statusText">

                Status:

                <strong className={`status ${getVisibilityStatus(visibilityKm).toLowerCase()}`}>
                    {getVisibilityStatus(visibilityKm)}
                </strong>

            </p>

        </div>

    );
}


function getVisibilityStatus(value) {

    if (value >= 10) {
        return " Good";
    }

    if (value >= 5) {
        return " Average";
    }

    return " Poor";
}