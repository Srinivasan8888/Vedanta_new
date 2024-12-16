import React, { useState } from "react";

const TimeInterval = () => {
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("default");
  const [selectedButton, setSelectedButton] = useState(0);

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="md:h-[100%] h-[380px]">
      <div className="md:h-[11%] flex justify-center text-xl font-semibold mt-2">
        Select Time Interval
      </div>

      <div className="flex md:flex-row flex-col gap-4 mt-2 md:mt-0 items-center justify-center w-full md:gap-2 md:h-[25%] md:space-x-10">
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>
      </div>

      <div className="flex-1 text-lg font-semibold md:h-[10%] mt-2">
       Get one data for every
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-14 md:h[20%] mt-6">
        <div className="flex items-center mb-4">
          <input
            id="radio-1"
            type="radio"
            value="option1"
            name="radio-group"
            checked={selected === "option1"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-1"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            Minute
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="radio-2"
            type="radio"
            value="option2"
            name="radio-group"
            checked={selected === "option2"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-2"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            hour
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="radio-3"
            type="radio"
            value="option3"
            name="radio-group"
            checked={selected === "option3"}
            onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-3"
            className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
          >
            Day
          </label>
        </div>
      </div>

      <div className="bg-[rgba(16,16,16,1)] border-2 border-white md:h-[20%] h-[15%] w-[55.5%] md:w-[30%] rounded-lg flex items-center justify-center md:mb-0 mx-auto">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </div>
  );
};

export default TimeInterval;
