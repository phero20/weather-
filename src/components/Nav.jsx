import search from "../assets/search.png";
import location from "../assets/location-pin.png";
import React, { useContext, useState } from "react";
import { BoxInfo } from "../App";
import logo from "../assets/cloudy.png";

export default function Nav({ onSearchChange }) {
  const { city, formattedDate, state, country } = useContext(BoxInfo);
  const [Search, setSearch] = useState("");
  const [isclick, setclick] = useState(false);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchChange(Search);
    }
  };
  const handleclick = () => {
    if (isclick) {
      setclick(false);
      onSearchChange(Search);
    } else setclick(true);
  };

  return (
    <div className="nav w-full top-0 left-0 z-10 flex flex-col items-center">
      <div className="search px-4 pb-7 py-5 md:w-2/3 w-full flex justify-between">
        <div
          className={`text-2xl flex ${
            isclick ? "hidden" : "flex"
          } items-end font-semibold text-yellow-300 drop-shadow-xl gap-2`}
        >
          <img src={logo} alt="" className="con w-12 h-12" />
          <span>Weather</span>
        </div>
        <div
          className={`relative ${
            isclick ? "w-full" : "w:1/2"
          } cursor-pointer flex justify-end`}
        >
          <input
            type="search"
            name="search"
            id="search"
            className={`ani ${
              isclick ? "w-full text-lg text-center" : "w-11 "
            } h-11 rounded-full font-normal`}
            value={Search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder={`${isclick ? "Search by city, state, or country" : ""}`}
          />
          <img
            onClick={handleclick}
            src={search}
            alt="Search Icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>
      </div>

      <div className="location text-white md:w-2/3 w-full h-10 flex px-5 py-2 items-center justify-between">
        <div className="flex items-center gap-1 text-base">
          <img src={location} alt="" className="w-8 h-8" />
          <div className="flex flex-col justify-around text-xs">
            <span>{city}</span>
            <span>
              {state.length > 10 ? state.slice(0,10)+'...' : state},{country}
            </span>
          </div>
        </div>
        <div className="a flex text-lg">{formattedDate}</div>
      </div>
    </div>
  );
}
