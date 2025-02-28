import React, { useState } from "react";

import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import reportimg from "../../Assets/images/reportimg.png";

import ReportsButton from "../../Assets/components/Reports/ReportsButton";
import AverageDateRange from "../../Assets/components/Reports/AverageDateRange";
import TimeInterval from "../../Assets/components/Reports/TimeInterval";
import RangeDate from "../../Assets/components/Reports/RangeDate";
import CountData from "../../Assets/components/Reports/CountData";


const Report = () => {
  const [selectedButton, setSelectedButton] = useState("Average");

  return (
    <div
      className="relative w-screen overflow-y-hidden bg-fixed bg-center bg-cover md:h-screen md:bg-center h-[1100px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      {/* <div className="flex bg-[rgba(16,16,16,0.5)] md:h-[87%] m-4 rounded-lg border border-white sm:flex-cols sm:flex-row-none md:flex-row"> */}
      <div className="flex bg-[rgba(16,16,16,0.5)] md:h-[90%] lg:h-[87%]  m-4 rounded-lg border border-white flex-col xl:flex-row ">
        <ReportsButton
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <div className="bg-[rgb(9,9,11)]  md:w-[92%] xl:w-[92%] md:h-[100%] lg:h-[90%] m-8 rounded-lg border border-white backdrop-blur-lg text-white flex">
          <div className="md:w-[50%] xl:flex md:hidden items-center justify-center m-36 rounded-lg hidden sm:flex">
            <img src={reportimg} className="w-full h-auto rounded-md" />
          </div>
          {selectedButton === "Average" && <AverageDateRange />}
          {selectedButton === "Time" && <TimeInterval />} 
          {selectedButton === "Range" && <RangeDate />}
          {selectedButton === "Count" && <CountData />} 
        </div>
      </div>
    </div>
  );
};

export default Report