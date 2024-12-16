import React, { useState } from "react";
import Average from "../../images/Average.png";
import Count from "../../images/Count.png";
import Dateimg from "../../images/Date.png";
import Interval from "../../images/Interval.png";

const AnalyticsButton = ({ selectedButton, setSelectedButton }) => {
  // const [selectedButton, setSelectedButton] = useState("Average");
  return (
    <div className="md:w-[25%] md:h-[100%] h-[270px] bg-[rgba(16,16,16,0.6)] mt-4 grid grid-cols-2 gap-4 rounded-xl p-4 border  backdrop-blur-sm md:backdrop-blur border-white">
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%]   focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 0 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Average")}
      >
        <img src={Average} className="w-6 h-6" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Average Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 1 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Time")}
      >
        <img src={Interval} className="w-6 h-auto" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Interval Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 2 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Range")}
      >
        <img src={Dateimg} className="w-6 h-auto" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Date Picker</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 3 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Count")}
      >
        <img src={Count} className="w-6 h-auto" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Count-wise Data</div>
      </button>
    </div>
  );
};

export default AnalyticsButton;
