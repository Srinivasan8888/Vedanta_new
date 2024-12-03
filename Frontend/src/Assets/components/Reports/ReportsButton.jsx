import React from "react";
import Average from "../../images/Average.png";
import Count from "../../images/Count.png";
import Dateimg from "../../images/Date.png";
import Interval from "../../images/Interval.png";

const ReportsButton = ({selectedButton, setSelectedButton}) => {
  return (
    <div className="bg-[rgba(16,16,16,0.6)] md:w-[20%] md:h-[92%] m-8 rounded-lg border border-white backdrop-blur-sm justify-center items-center mt-8 grid grid-row">
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border md:h-40 md:w-60 focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 0 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Average")}
      >
        <img src={Average} className="w-6 h-auto" />
        <div className="mt-4 font-medium text-white">Average Data</div>
      </button>

      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 1 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Time")}
      >
        <img src={Interval} className="w-6 h-auto" />
        <div className="mt-4 font-medium text-white">Interval Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 2 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Range")}
      >
        <img src={Dateimg} className="w-6 h-auto" />
        <div className="mt-4 font-medium text-white">Date Picker</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 3 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Count")}
      >
        <img src={Count} className="w-6 h-auto" />
        <div className="mt-4 font-medium text-white">Count-wise Data</div>
      </button>
    </div>
  );
};

export default ReportsButton;
