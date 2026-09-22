const GEO_URL =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast";

const AIR_QUALITY_URL =
    "https://air-quality-api.open-meteo.com/v1/air-quality";


export async function getCoordinates(city) {

    const response = await fetch(
        `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
        throw new Error("Unable to find location");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
    }

    const location = data.results[0];

    return {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone
    };
}


export async function getWeatherForecast(latitude, longitude) {

    const params = new URLSearchParams({

        latitude,
        longitude,

        current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m",

        hourly:
            "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,uv_index",

        daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset",

        forecast_days: "7",

        timezone: "auto"
    });

    const response = await fetch(
        `${WEATHER_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch weather");
    }

    return await response.json();
}


export async function getAirQuality(latitude, longitude) {

    const params = new URLSearchParams({

        latitude,
        longitude,

        current:
            "european_aqi,us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone",

        timezone: "auto"
    });

    const response = await fetch(
        `${AIR_QUALITY_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch air quality");
    }

    return await response.json();
}


export async function getWeatherData(city) {

    const location = await getCoordinates(city);

    const [weather, airQuality] = await Promise.all([
        getWeatherForecast(
            location.latitude,
            location.longitude
        ),

        getAirQuality(
            location.latitude,
            location.longitude
        )
    ]);

    return {
        location,
        weather,
        airQuality
    };
}