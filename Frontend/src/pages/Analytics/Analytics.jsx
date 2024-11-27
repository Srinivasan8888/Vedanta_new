import React, { useState } from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import AnalyticsButton from "../../Assets/components/Analytics/AnalyticsButton";
import "./Analytics.css";
import AverageDateRange from "../../Assets/components/Analytics/AverageDateRange";
import TimeInterval from "../../Assets/components/Analytics/TimeInterval";
import RangeDate from "../../Assets/components/Analytics/RangeDate";
import CountData from "../../Assets/components/Analytics/CountData";

const Analytics = () => {
  const [selectedButton, setSelectedButton] = useState("Average");

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="bg-[rgba(16,16,16,0.5)] md:h-[87%] m-8 rounded-lg border border-white">
        <div className="md:h-[35%] md:flex m-4 gap-3">
          <AnalyticsButton
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <div className="md:w-[35%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border flex flex-col border-white text-white backdrop-blur justify-center items-center py-4">
            {selectedButton === "Average" && <AverageDateRange />}
            {selectedButton === "Time" && <TimeInterval />}
            {selectedButton === "Range" && <RangeDate />}
            {selectedButton === "Count" && <CountData />}
          </div>

          <div className="md:w-[40%] bg-[rgba(16,16,16,0.7)] rounded-xl mt-4 border border-white">
            <div className="flex gap-7 py-4 overflow-x-scroll text-lg font-normal text-white justify-evenly font-poppins bg-[rgb(16,16,16)] rounded-tr-xl rounded-tl-xl px-3 ">
              <p className="">S.No</p>
              <p className="whitespace-nowrap">Avg T1</p>
              <p className="whitespace-nowrap">Avg T2</p>
              <p className="whitespace-nowrap">Avg T3</p>
              <p className="whitespace-nowrap">Avg T4</p>
              <p className="whitespace-nowrap">Avg T5</p>
              <p className="whitespace-nowrap">Avg T6</p>
              <p className="whitespace-nowrap">Avg T7</p>
              <p className="whitespace-nowrap">Avg T8</p>
              <p className="whitespace-nowrap">Avg T9</p>
              <p className="whitespace-nowrap">Avg T10</p>
              <p className="whitespace-nowrap">Avg T11</p>
              <p className="whitespace-nowrap">Avg T12</p>
            </div>
            
          </div>
        </div>
        <div className="md:h-[58%] md:flex">
          <div className="md:w-full md:h-full m-4 bg-[rgba(16,16,16,0.6)] rounded-xl border border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
