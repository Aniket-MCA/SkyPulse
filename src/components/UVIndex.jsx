export default function UVIndex({ weather }) {

    const uv = weather.daily.uv_index_max[0];

    const maxUV = 12;

    // Keep UV between 0 and 12
    const value = Math.min(Math.max(uv, 0), maxUV);

    // Convert UV value into percentage
    const progress = value / maxUV;


    return (

        <div className="highlightCard uvCard">

            <h3>UV Index</h3>


            <div className="uvGauge">

                <svg
                    viewBox="0 0 320 180"
                    className="uvSvg"
                >

                    {/* Background arc */}
                    <path
                        d="M 40 150 A 120 120 0 0 1 280 150"
                        className="uvBackground"
                    />


                    {/* Orange progress arc */}
                    <path
                        d="M 40 150 A 120 120 0 0 1 280 150"
                        className="uvProgress"
                        pathLength="100"
                        strokeDasharray={`${progress * 100} 100`}
                    />


                    {/* UV scale numbers */}
                    {[0, 2, 4, 6, 8, 10, 12].map((number) => {

                        const angle =
                            Math.PI - (number / maxUV) * Math.PI;

                        const centerX = 160;
                        const centerY = 148;

                        const labelRadius = 115;

                        const x =
                            centerX +
                            labelRadius * Math.cos(angle);

                        const y =
                            centerY -
                            labelRadius * Math.sin(angle);


                        return (
                            <text
                                key={number}
                                x={x}
                                y={y}
                                className="uvScale"
                                textAnchor="middle"
                            >
                                {number}
                            </text>
                        );

                    })}

                </svg>


                {/* Current UV value */}
                <div className="uvNumber">
                    {Math.round(value)}
                </div>

            </div>

        </div>

    );
}


function getUVStatus(uv) {

    if (uv <= 2) {
        return "Low";
    }

    if (uv <= 5) {
        return "Moderate";
    }

    if (uv <= 7) {
        return "High";
    }

    if (uv <= 10) {
        return "Very High";
    }

    return "Extreme";
}