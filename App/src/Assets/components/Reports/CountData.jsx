import React, { useState } from "react";

const CountData = () => {
  const [selected, setSelected] = useState("");

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <>
      <div className="md:w-[50%]">
      <div className="md:h-[16%] flex flex-row justify-center items-end md:text-3xl md:font-semibold md:mt-0 mt-4">
          Select Count
        </div>
        <div className="flex flex-col md:h-[60%] gap-10 justify-center mx-16 mt-10 md:mt-0">
          <div className="flex flex-row items-center justify-center">
            <div className="items-end justify-end ml-2">
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
                  Last 100 Data
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <div className="items-end justify-end ml-2">
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
          <div className="flex flex-row items-center justify-center">
            <div className="items-end justify-end ml-2">
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
                  Last 1000 Data
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <div className="items-end justify-end ml-2">
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
                  Custom Data
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:h-[25%] text-lg font-bold justify-center item-center pt-8 mb-4 md:mb-0">
          <div className="flex items-center justify-center w-56 h-16 bg-[rgba(232,235,236,1)] rounded-lg text-black">
            <button className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
              <span className="ml-2">Download Excel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountData;
