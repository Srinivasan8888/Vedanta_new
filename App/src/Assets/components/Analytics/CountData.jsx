import React, { useState } from "react";

const CountData = () => {
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
        Select Count
      </div>
      <div className="flex flex-col gap-4 mt-10 md:mt-0 items-center justify-center w-full md:gap-4 md:h-[58.4%] mb-[1.6px]">
        <div className="flex flex-row mt-4 space-x-2 md:flex-1 md:space-x-20">
          <div className="flex items-center ">
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
              Last 100 Data
            </label>
          </div>
          <div className="flex items-center ">
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
              Last 500 Data
            </label>
          </div>
        </div>
        <div className="flex flex-1 mb-4 space-x-2 md:space-x-20">
          <div className="flex items-center">
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
              Last 1000 Data
            </label>
          </div>
          <div className="flex items-center ">
            <input
              id="radio-4"
              type="radio"
              value="option4"
              name="radio-group"
              checked={selected === "option4"}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="radio-4"
              className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
            >
              Custom Data
            </label>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(16,16,16,1)] border-2 border-white h-[60px] w-[100px] md:w-[37.5%] md:h-[21%]  rounded-lg flex items-center justify-center mt-8 mb-1 md:mt-0 md:mb-0 mx-auto">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </div>
  );
};

export default CountData;
