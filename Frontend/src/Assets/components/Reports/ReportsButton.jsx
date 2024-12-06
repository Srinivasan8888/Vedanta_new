import React from "react";
import Average from "../../images/Average.png";
import Count from "../../images/Count.png";
import Dateimg from "../../images/Date.png";
import Interval from "../../images/Interval.png";

const ReportsButton = ({ selectedButton, setSelectedButton }) => {
  return (
    <div className="bg-[rgba(16,16,16,0.6)] md:w-[20%] md:h-[92%] h-[270px] md:m-8 rounded-xl border border-white backdrop-blur-sm justify-center items-center mt-4 grid grid-cols-2 md:grid-row gap-4 md:gap-0 p-4 m-4 md:p-0 md:grid-cols-none">
      {" "}
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl border h-[100%] md:h-40 md:w-60 focus:ring-2 focus:ring-white flex flex-col justify-center items-center${
          selectedButton === 0 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Average")}
      >
        <img src={Average} className="w-6 h-6 md:h-auto md:mt-0" />
        <div className="mt-4 text-sm text-white font-regular md:font-medium md:text-lg">Average Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border   h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center${
          selectedButton === 1 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Time")}
      >
        <img src={Interval} className="w-6 h-6 md:h-auto md:mt-0" />
        <div className="mt-4 text-sm text-white font-regular md:font-medium md:text-lg ">Interval Data</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border  h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 2 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Range")}
      >
        <img src={Dateimg} className="w-6 h-6 md:h-auto md:mt-0" />
        <div className="mt-4 text-sm text-white font-regular md:font-medium md:text-lg">Date Picker</div>
      </button>
      <button
        className={`bg-[rgb(16,16,16)] rounded-xl  md:h-40 md:w-60 border  h-[100%] focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
          selectedButton === 3 ? "ring-2" : ""
        }`}
        onClick={() => setSelectedButton("Count")}
      >
        <img src={Count} className="w-6 h-6 md:h-auto md:mt-0" />
        <div className="mt-4 text-sm text-white font-regular md:font-medium md:text-lg">Count-wise Data</div>
      </button>
    </div>
  );
};

export default ReportsButton;
