import logo from "/src/assets/SkyPluse no bg logoo.png";

import SearchBar from "./searchBar";
import CurrentWeather from "./CurrentWeather";

import "./nav.css";

export default function Nav({ onSearch, weather, location, unit }) {
  return (
    <aside className="sidebar">
      <div className="nav">
        <img src={logo} alt="SkyPulse logo" className="logo" />
        <h2 className="sky">
          Sky<span className="pulse">Pulse</span>
        </h2>
      </div>

      <SearchBar onSearch={onSearch} />

      <CurrentWeather weather={weather} location={location} unit={unit} />
    </aside>
  );
}
