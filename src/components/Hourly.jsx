import React, { useContext } from "react";
import { BoxInfo } from "../App";

export default function Hourly() {
  const { hourly, presentT } = useContext(BoxInfo);

  const filteredSortedHourly = hourly
    .filter((item) => {
      const hour = parseInt(presentT.split(" ")[1].split(":")[0], 10);

      const date = new Date(item.time_epoch * 1000);
      const hours = date.getHours();
      return hours >= hour;
    })
    .sort((a, b) => a.time_epoch - b.time_epoch);

  const leftovers = hourly
    .filter((item) => {
      const hour = parseInt(presentT.split(" ")[1].split(":")[0], 10);
      const date = new Date(item.time_epoch * 1000);
      const hours = date.getHours();
      return hours < hour;
    })
    .sort((a, b) => a.time_epoch - b.time_epoch);

  const combinedHourly = [...filteredSortedHourly, ...leftovers];

  function formatTimeEpochTo12Hour(timeEpoch) {
    const date = new Date(timeEpoch * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}${minutes > 0 ? ":" + minutes : ""} ${ampm}`;
    return formattedTime;
  }

  const formaterr = (timeepoch) => {
    return formatTimeEpochTo12Hour(timeepoch);
  };

  const newFor = (data) => {
    const date = new Date(data * 1000);
    const hours = date.getHours();
    const hour = parseInt(presentT.split(" ")[1].split(":")[0], 10);
    if (parseInt(hours) == parseInt(hour)) {
      return true;
    }
    return false;
  };

  return (
    <div className="md:w-3/5 w-11/12 flex flex-col py-7">
      <h1 className="text-white text-xl font-semibold text-left px-1">
        Hourly Forecast
      </h1>
      <ul className="ul overflow-x-auto pr-4 py-3 flex gap-3 whitespace-nowrap cursor-pointer w-full">
        {combinedHourly.map((element, index) => {
          return (
            <li key={index}>
              <div
                className={`inrbox1 flex flex-col py-3 justify-evenly items-center text-base  font-medium ${"rounded-xl text-white"}`}
                style={
                  newFor(element.time_epoch)
                    ? { backgroundColor: "rgba(7, 162, 218, 0.6)" }
                    : { backgroundColor: "rgb(0,0,0 ,0.409)" }
                }
              >
                <span>{formaterr(element.time_epoch)}</span>
                <img
                  src={element.condition.icon}
                  alt=""
                  className="w-16 h-16 "
                />
                <span>{Math.ceil(element.temp_c)} °C</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
