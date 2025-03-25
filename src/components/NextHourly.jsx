import React from "react";

export default function Hourly(props) {
  const hourly = props.hourly;

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
    const timeEpoch = timeepoch;
    const formattedTime = formatTimeEpochTo12Hour(timeEpoch);

    return formattedTime;
  };
  return (
    <>
      <div className="w-11/12 flex flex-col px-2">
        <h1 className="text-white text-lg font-medium text-left px-1">
          Hourly Forecast
        </h1>
        <ul className="ul overflow-x-auto pr-4 flex gap-1 whitespace-nowrap cursor-pointer w-full">
          {hourly.map((element, index) => {
            return (
              <li key={index}>
                <div className="t flex flex-col py-2 justify-evenly items-center rounded-xl text-white font-medium w-16">
                  <span>{formaterr(element.time_epoch)}</span>
                  <img
                    src={element.condition.icon}
                    alt=""
                    className="w-12 h-12 "
                  />
                  <span>{Math.ceil(element.temp_c)} °C</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
