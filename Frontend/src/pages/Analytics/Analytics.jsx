import React, { useState } from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import AnalyticsButton from "../../Assets/components/Analytics/AnalyticsButton";
import "./Analytics.css";
import AverageDateRange from "../../Assets/components/Analytics/AverageDateRange";

import Interval from "../../Assets/images/Interval.png";

import Average from "../../Assets/images/Average.png";
import Count from "../../Assets/images/Count.png";
import Dateimg from "../../Assets/images/Date.png";
import TimeInterval from "../../Assets/components/Analytics/TimeInterval";
import RangeDate from "../../Assets/components/Analytics/RangeDate";
import CountData from "../../Assets/components/Analytics/CountData";

const Analytics = () => {
  
  const [selected, setSelected] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("default");
  const [selectedButton, setSelectedButton] = useState("Average");

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="bg-[rgba(16,16,16,0.5)] md:h-[87%] m-8 rounded-lg border border-white">
        <div className="md:h-[35%] md:flex m-4 gap-3">
          {/* <AnalyticsButton onClick={() => handleButtonClick(1)} isActive={selectedButton === 1} /> */}

          <div className="md:w-[25%] bg-[rgba(16,16,16,0.6)] mt-4 grid grid-cols-2 gap-4 rounded-xl p-4 border border-white">
            <button
              className={`bg-[rgb(16,16,16)] rounded-xl border  focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
                selectedButton === 0 ? "ring-2" : ""
              }`}
              onClick={() => setSelectedButton("Average")}
            >
              <img src={Average} className="w-6 h-auto" />
              <div className="mt-4 font-medium text-white">Average Data</div>
            </button>
            <button
              className={`bg-[rgb(16,16,16)] rounded-xl border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
                selectedButton === 1 ? "ring-2" : ""
              }`}
              onClick={() => setSelectedButton("Time")}
            >
              <img src={Interval} className="w-6 h-auto" />
              <div className="mt-4 font-medium text-white">Interval Data</div>
            </button>
            <button
              className={`bg-[rgb(16,16,16)] rounded-xl border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
                selectedButton === 2 ? "ring-2" : ""
              }`}
              onClick={() => setSelectedButton("Range")}
            >
              <img src={Dateimg} className="w-6 h-auto" />
              <div className="mt-4 font-medium text-white">Date Picker</div>
            </button>
            <button
              className={`bg-[rgb(16,16,16)] rounded-xl border focus:ring-2 focus:ring-white flex flex-col justify-center items-center ${
                selectedButton === 3 ? "ring-2" : ""
              }`}
              onClick={() => setSelectedButton("Count")}
            >
              <img src={Count} className="w-6 h-auto" />
              <div className="mt-4 font-medium text-white">Count-wise Data</div>
            </button>
          </div>

          <div className="md:w-[35%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border flex flex-col border-white text-white backdrop-blur justify-center items-center py-4">
           
           {selectedButton === 'Average' &&  <AverageDateRange/> }
           {selectedButton === 'Time' &&  <TimeInterval/> }
           {selectedButton === 'Range' &&  <RangeDate/> }
           {selectedButton === 'Count' && <CountData/> }
           
          </div>
          <div className="md:w-[40%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border border-white"></div>
        </div>
        <div className="md:h-[58%] md:flex">
          <div className="md:w-full md:h-full m-4 bg-[rgba(16,16,16,0.6)] rounded-xl border border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
