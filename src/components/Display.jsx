import React, { useContext } from "react";
import { BoxInfo } from "../App";
import Conditions from "./Conditions";
import Hourly from "./Hourly";
import Next from "./Next";

export default function Display() {
  const { tempC, condition, conditionImage } = useContext(BoxInfo);

  return (
    <div className="w-full flex flex-col items-center overflow-y-auto">
      <div className="weather md:w-2/3 w-full px-6 pl-4 py-6 flex justify-between">
        <img src={conditionImage} alt={condition} className="con w-36 h-36" />
        <div className="weather1 flex flex-col text-white text-lg font-medium justify-center items-end">
          <span className="text-4xl font-semibold text-white">{tempC}</span>
          <span>{condition}</span>
        </div>
      </div>
      <Conditions />
      <Hourly />
      <Next />
    </div>
  );
}
