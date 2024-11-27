import React, { useState } from "react";

const AverageDateRange = () => {
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("default");
  const [selectedButton, setSelectedButton] = useState(0);

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div className="flex-1 text-xl font-bold">Select Date Range</div>
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.63)] bg-white border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
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
            className="w-full text-sm text-white bg-[rgba(0,0,0,0.63)] bg-white border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
          />
        </div>
      </div>

      <div className="flex-1 mt-3 text-lg font-bold">Average By</div>
      <div className="flex flex-1 space-x-20">
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
      <div className="flex-1 bg-[rgba(16,16,16,1)] border-2 border-white md:h-16 md:w-36 rounded-xl flex items-center justify-center">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </>
  );
};

export default AverageDateRange;
