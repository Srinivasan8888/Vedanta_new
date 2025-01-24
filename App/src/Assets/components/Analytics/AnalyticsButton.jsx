import React from "react";
import Average from "../../images/Average.png";
import Count from "../../images/Count.png";
import Dateimg from "../../images/Date.png";
import Interval from "../../images/Interval.png";

const AnalyticsButton = ({ selectedButton = "Average", setSelectedButton }) => {
  // console.log("Selected Button in AnalyticsButton:", selectedButton); // Debugging

  return (
    <div className="md:w-[25%] md:h-[100%] h-[270px] bg-[rgba(16,16,16,0.6)] mt-4 grid grid-cols-2 gap-4 rounded-xl p-4 border backdrop-blur-sm md:backdrop-blur border-white">
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === "Average" ? "!border-2 !border-white" : "border-2 border-white"
        }`}
        onClick={() => setSelectedButton("Average")}
      >
        <img src={Average} className="w-6 h-6" alt="Average" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Average Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === "Time" ? "!border-2 !border-white" : "border-2 border-white"
        }`}
        onClick={() => setSelectedButton("Time")}
      >
        <img src={Interval} className="w-6 h-auto" alt="Interval" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Interval Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === "Range" ? "!border-2 !border-white" : "border border-white"
        }`}
        onClick={() => setSelectedButton("Range")}
      >
        <img src={Dateimg} className="w-6 h-auto" alt="Date" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Date Picker</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === "Count" ? "!border-2 !border-white" : "border border-white"
        }`}
        onClick={() => setSelectedButton("Count")}
      >
        <img src={Count} className="w-6 h-auto" alt="Count" />
        <div className="mt-4 text-sm text-white md:text-lg md:font-medium">Count-wise Data</div>
      </button>
    </div>
  );
};

export default AnalyticsButton;