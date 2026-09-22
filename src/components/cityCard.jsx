import DemoCity from "../assets/demo-images/default_city.png";
import {useState, useEffect} from "react";
import "./cityCard.css";
import { MapPin } from 'lucide-react';


export default function CityCard({
    city,
    country
}) {

     const unplash_url="https://api.unsplash.com/search/photos";
    const ACCESS_KEY= import.meta.env.VITE_UNPLASH_ACCESS_KEY;

    let [cityImage, setCityImage]=useState("");
    async function showImage() {
        if (!city) return;

        const response = await fetch(
            `${unplash_url}?query=${city}&per_page=1&client_id=${ACCESS_KEY}`
        );

        const jsonresponse = await response.json();

        setCityImage(jsonresponse.results[0]?.urls?.regular);
    }
     
    useEffect(()=>{
        showImage();
    },[city])


    return (

        <div className="imageCard">

            <img
                src={cityImage || DemoCity}
                className="cityImg"
                alt={city}
            />


            <div className="cityOverlay">

                <span><MapPin size={18}/></span>

                {city}, {country}

            </div>

        </div>

    );
}