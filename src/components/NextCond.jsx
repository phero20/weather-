import React from "react";
import Wind from "../assets/windy.png";
import HumidityImg from "../assets/humidity.png";
import airqualityimg from "../assets/air-quality.png";
import uvImg from "../assets/uv.png";
import precipitation from "../assets/precipitation.png";

export default function Conditions(props) {
  const air_quality = props.airquality;
  const uv = props.uv;
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
  const uv_index = () => {
    if (uv <= 2) return "Low";
    else if (uv > 2 && uv <= 5) return "Moderate";
    else if (uv > 5 && uv <= 7) return "High";
    else if (uv > 7 && uv <= 10) return "Very High";
    else if (uv >= 11) return "Extreme";
    else return "-";
  };
  const arr = [
    {
      1: props.rainChancesImg,
      2: Math.ceil(props.rainChances) + "%",
      3: "Rain Chances",
    },
    {
      1: precipitation,
      2: "Precipitation",
      3: props.precip + "%",
    },
    {
      1: Wind,
      2: "Wind Speed",
      3: Math.ceil(props.windSpeed) + " Kph",
    },
    {
      1: HumidityImg,
      2: "Humidity",
      3: props.humidity + "%",
    },
    {
      1: airqualityimg,
      2: "Air Quality",
      3: air(),
    },
    {
      1: uvImg,
      2: "UV",
      3: uv_index(),
    },
  ];

  return (
    <>
      <div className="box w-full grid md:grid-cols-6 grid-cols-3 gap-1 text-white text-center py-6">
        {arr.map((element, index) => {
          return (
            <div
              key={index}
              className="inrbox t flex flex-col justify-evenly items-center gap-1 border-gray-600 rounded-xl py-2"
            >
              <img src={element[1]} alt="" className="w-6 h-6" />
              <span>{element[2]}</span>
              <span>{element[3]}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
