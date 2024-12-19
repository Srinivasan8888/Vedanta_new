import React, { useState } from "react";

const RangeDate = () => {
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("default");
  const [selectedButton, setSelectedButton] = useState(0);

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="h-[280px]">
   
      <div className="md:h-[11%] flex justify-center text-xl font-semibold mt-2">
        Select Date
      </div>
      <div className="flex flex-col gap-4 mt-10 md:mt-0 items-center justify-center w-full md:gap-4 md:h-[58.4%] space-y-2 ">
        <div className="flex items-center space-x-2 ">
          <label
            htmlFor="startdate"
            className="text-sm font-medium text-white whitespace-nowrap"
          >
            From
          </label>
          <input
            type="date"
            id="startdate"
            name="startdate"
            className="w-full text-sm h-11 text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="enddate"
            className="text-sm font-medium text-white whitespace-nowrap"
          >
            To
          </label>
          <input
            type="date"
            id="enddate"
            name="enddate"
            className="w-full text-sm h-11 text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>
      </div>
      <div className="bg-[rgba(16,16,16,1)] border-2 border-white h-[60px] w-[100px] md:w-[64.5%] md:h-[20%]  rounded-lg flex items-center justify-center mt-10 mb-2 md:mt-[0.5px] md:mb-0 mx-auto">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </div>
  );
};

export default RangeDate;
