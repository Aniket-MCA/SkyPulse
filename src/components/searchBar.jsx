import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import "./searchBar.css";


export default function SearchBar({ onSearch }) {

    const [search, setSearch] = useState("");


    function handleChange(event) {

        setSearch(event.target.value);

    }


    function handleSubmit(event) {

        event.preventDefault();

        const city = search.trim();

        if (!city) {
            return;
        }

        onSearch(city);

        setSearch("");

    }


    return (

        <form
            className="searchForm"
            onSubmit={handleSubmit}
        >

            <div className="inputContainer">

                <input
                    type="text"
                    placeholder="Search places"
                    value={search}
                    onChange={handleChange}
                    className="searchBar"
                />


                <IconButton
                    type="submit"
                    className="searchButton"
                    aria-label="search"
                >

                    <SearchIcon />

                </IconButton>

            </div>

        </form>

    );
}