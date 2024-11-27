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
    
      <div className="flex flex-col items-center justify-center w-full mb-5 space-x-4">
        <div className="flex items-center gap-2 m-2 space-x-2 space-y-4">
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.63)] bg-white border border-gray-200 rounded-md shadow-sm p-2 custom-datepicker"
          />
        </div>

        <div className="flex items-center gap-2 m-2 space-x-2 space-y-4">
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.63)] bg-white border border-gray-200 rounded-md shadow-sm p-2 custom-datepicker"
          />
        </div>
      </div>

     
     
      
      <div className=" flex-1 bg-[rgba(16,16,16,1)] border-2 border-white md:h-10 md:w-36 rounded-xl flex items-center justify-center">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </>
  );
};

export default RangeDate;
