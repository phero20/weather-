import React, { useContext, useState } from "react";
import { BoxInfo } from "../App";
import NextCond from "../components/NextCond";
import NextHourly from "../components/NextHourly";

export default function Next() {
  function getDayFromDate(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  const [expandedIndex, setExpandedIndex] = useState(0);
  const { forcast } = useContext(BoxInfo);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 flex flex-col py-1 pb-5 gap-3 items-center">
      <h1 className="text-white text-xl font-semibold text-left px-2 md:w-8/12 w-full">
        Next 7 Days
      </h1>

      {forcast.slice(1).map((element, index) => (
        <div
          key={index}
          className={`bg1 ani flex md:w-8/12 w-full py-6 gap-2 overflow-hidden cursor-pointer ${
            expandedIndex === index ? "h-[28rem]" : "h-28"
          } rounded-xl flex-col`}
          onClick={() => toggleExpand(index)}
        >
          <div
            className={`${
              expandedIndex === index ? "h-1/2" : "h-full"
            } flex justify-between px-5`}
          >
            <div className={`weather flex flex-col text-white justify-center`}>
              <span className="text-xl font-medium">
                {getDayFromDate(element.date)}
              </span>
              <span className="font-light text-gray-300">
                {element.day.condition.text}
              </span>
            </div>
            <div className="right text-white text-2xl font-medium flex items-center gap-2">
              <img
                src={element.day.condition.icon}
                alt=""
                className="w-16 h-16"
              />
              <span>{Math.ceil(element.day.avgtemp_c)} °C</span>
            </div>
          </div>
          <div
            className={`down ani w-full ${
              expandedIndex === index ? "flex" : "hidden"
            } flex-col gap-2 items-center`}
          >
            <NextCond
              rainChances={element.day.daily_chance_of_rain}
              rainChancesImg={element.day.condition.icon}
              rainChancestext={element.day.condition.text}
              precip={element.day.totalprecip_mm}
              windSpeed={element.day.maxwind_kph}
              humidity={element.day.avghumidity}
              airquality={element.day.air_quality["us-epa-index"]}
              uv={element.day.uv}
            />
            <NextHourly hourly={element.hour} />
          </div>
        </div>
      ))}
    </div>
  );
}
