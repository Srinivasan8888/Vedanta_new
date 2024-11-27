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
    <>
      <div className="flex-1 text-xl font-bold">Select Date</div>
      <div className="flex flex-row items-center justify-center w-full mb-5 space-x-4">
        <div className="flex items-center space-x-2">
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.6)] bg-white border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full mb-5 space-x-4">
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.6)] bg-white border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>
      </div>

      <div className="flex flex-1 space-x-20">
        
      </div>
      <div className="flex-1 bg-[rgba(16,16,16,1)] border-2 border-white md:h-16 md:w-36 rounded-xl flex items-center justify-center">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </>
  );
};

export default RangeDate;
