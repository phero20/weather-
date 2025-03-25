import React, { useContext } from "react";
import { BoxInfo } from "../App";
import Wind from "../assets/windy.png";
import HumidityImg from "../assets/humidity.png";
import airqualityimg from "../assets/air-quality.png";
import uvImg from "../assets/uv.png";
import precipitation from "../assets/precipitation.png";

export default function Conditions() {
  const {
    rainChances,
    rainChancesImg,
    windSpeed,
    humidity,
    air_quality,
    uv,
    precip,
  } = useContext(BoxInfo);
  const air = () => {
    if (air_quality == 1) {
      return "Good";
    } else if (air_quality == 2) {
      return "Moderate";
    } else if (air_quality == 3 || air_quality == 4) {
      return "Unhealthy";
    } else if (air_quality == 5) {
      return "Very Unhealthy";
    } else if (air_quality == 6) {
      return "Hazardous";
    } else {
      return "-";
    }
  };
  const uv_index = (uv) => {
    if (uv <= 2) return "Low";
    else if (uv > 2 && uv <= 5) return "Moderate";
    else if (uv > 5 && uv <= 7) return "High";
    else if (uv > 7 && uv < 11) return "Very High"; 
    else if (uv >= 11) return "Extreme";
  };

  const arr = [
    {
      1: rainChancesImg,
      2: rainChances,
      3: "Rain Chances",
    },
    {
      1: precipitation,
      2: "Precipitation",
      3: precip,
    },
    {
      1: Wind,
      2: "Wind Speed",
      3: windSpeed,
    },
    {
      1: HumidityImg,
      2: "Humidity",
      3: humidity,
    },
    {
      1: airqualityimg,
      2: "Air Quality",
      3: air(),
    },
    {
      1: uvImg,
      2: "UV",
      3: uv_index(uv),
    },
  ];

  return (
    <>
      <div className="box md:w-3/5 w-11/12 grid grid-cols-3 gap-4 text-white text-center py-2">
        {arr.map((element, index) => {
          return (
            <div
              key={index}
              className="inrbox bg1 flex flex-col p-2 justify-evenly items-center border-gray-600 rounded-xl text-xs h-28"
            >
              <img src={element[1]} alt="" className="w-8 h-8" />
              <span>{element[2]}</span>
              <span>{element[3]}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
