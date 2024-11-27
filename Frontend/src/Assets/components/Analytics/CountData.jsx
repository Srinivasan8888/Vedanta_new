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
    <>
      <div className="flex-1 text-xl font-bold">Select Date</div>

      <div className="flex flex-col items-center justify-center w-full mb-5 space-x-4">
        <div className="flex items-center gap-2 m-3 space-x-2 space-y-4">
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
                Last 100 Data
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
                Last 500 Data
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full mb-5 space-x-4">
        <div className="flex items-center gap-2 m-3 space-x-2 space-y-4">
          <div className="flex flex-1 space-x-20">
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
                Last 1000 Data
              </label>
            </div>
            <div className="flex items-center mb-4">
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
      </div>

      <div className=" flex-1 bg-[rgba(16,16,16,1)] border-2 border-white md:h-13 md:w-36 rounded-xl flex items-center justify-center">
        <button className="flex items-center justify-center">Plot Graph</button>
      </div>
    </>
  );
};

export default CountData;
