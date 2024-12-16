import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const TimeInterval = () => {
  const [selected, setSelected] = useState("");

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <>
      <div className="md:w-[50%] w-[100%] md:mb-0 ">
        <div className="md:h-[16%] flex flex-row justify-center items-end md:text-3xl md:font-semibold md:mt-0 mt-4">
          Select Time Interval
        </div>
        <div className="flex flex-col md:h-[40%] gap-10 justify-center mx-16">
          <div className="flex flex-col items-center justify-between mt-10 md:flex-row">
            <div className="items-start text-xl font-normal">Configuration</div>
            <div className="items-end justify-end mt-4 ml-2 md:mt-0">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-64 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 backdrop-blur-[8px] shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]">
                    Select Configuration
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        option 1
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        option 2
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        option 3
                      </a>
                    </MenuItem>
                    <form action="#" method="POST">
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                          option 4
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-xl font-normal text-start">From</div>
            <div>
              <input
                type="date"
                id="startdate"
                name="startdate"
                className="w-64 h-9 text-sm text-black bg-[rgb(232, 235, 236)] border border-gray-200 rounded-md p-1 custom-datepicker backdrop-blur-[8px] md:mt-0 mt-4 shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-xl font-normal text-start">to</div>
            <div>
              <input
                type="date"
                id="enddate"
                name="enddate"
                className="w-64 h-9 text-sm text-black bg-[rgb(232, 235, 236)] border border-gray-200 rounded-md p-1 custom-datepicker backdrop-blur-[8px] md:mt-0 mt-4 shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]"

              />
            </div>
          </div>
        </div>
        <div className="flex md:h-[10%] text-lg font-bold justify-center item-center pt-10">
          Get 1 data for every-
        </div>
        <div className="flex md:h-[10%] space-x-20 items-center justify-center md:mt-0 mt-4">
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
        <div className="flex md:h-[15%] text-lg font-bold justify-center item-center md:pt-8 mb-4 md:mb-0">
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

export default TimeInterval;
