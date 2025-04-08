import React from "react";
import adduser from "./img/Vector.svg";
import "../../miscellaneous/Scrollbar.css";

const Generatereport = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      {/* <div className="flex items-end justify-end p-4">
        <button
          type="button"
          class="mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
        >
          <img src={adduser} alt="adduser" className="w-5 h-5 -ms-1 me-2" />
          Add User
        </button>
      </div> */}
      <div className="flex flex-col flex-1 gap-4 px-4 py-4">
        <div className="h-[70%] rounded-2xl bg-[#101010]/90 backdrop-blur-sm border-2 border-white">
          <div className="flex h-[15%] items-center justify-between px-6">
            <div className="justify-start font-['Poppins'] text-2xl font-semibold text-white">
              Select People
            </div>
            <div>
              <button
                type="button"
                class="inline-flex items-center rounded-full border border-blue-700 p-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
              >
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
          <div className="h-0 w-full outline outline-1 outline-offset-[-0.50px] outline-[rgba(255,255,255,1)]" />
          <div className="scrollbar-customd h-[80%]  overflow-x-auto">
            <div className="min-w-[30px] overflow-x-auto">
              <table className="w-full text-white">
                <thead className="sticky top-0 bg-[#101010]/90 text-base backdrop-blur-sm">
                  <tr>
                  <th scope="col" className="px-4 py-3 text-center whitespace-nowrap ">Name</th>
                  <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Email</th>
                  <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Role</th>
                  <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Status</th>
                  <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">{" "}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">john.doe@example.com</td>
                    <td className="px-4 py-4">1234567890</td>
                    <td className="px-4 py-4">1234 Main St</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">john.doe@example.com</td>
                    <td className="px-4 py-4">1234567890</td>
                    <td className="px-4 py-4">1234 Main St</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">john.doe@example.com</td>
                    <td className="px-4 py-4">1234567890</td>
                    <td className="px-4 py-4">1234 Main St</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">john.doe@example.com</td>
                    <td className="px-4 py-4">1234567890</td>
                    <td className="px-4 py-4">1234 Main St</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">john.doe@example.com</td>
                    <td className="px-4 py-4">1234567890</td>
                    <td className="px-4 py-4">1234 Main St</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="h-[30%] w-full rounded-2xl bg-[#101010]/90 backdrop-blur-sm">
          <div className="flex h-[15%] items-center justify-between px-6">
            <div className="mt-4 justify-start font-['Poppins'] text-2xl font-semibold text-white">
              Select Frequency
            </div>
          </div>
          <div className="flex h-[55.5%] flex-col items-center justify-center overflow-hidden px-6 py-4">
            <div className="flex justify-around w-full h-full mt-6 flex-cols-3 md:mt-0">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="daily"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Daily
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Weekly
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value="monthly"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Monthly
                </span>
              </label>
            </div>
           
          </div>
          <button
            type="button"
            className="mt-4 inline-flex h-12 w-32 items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-center text-sm text-black backdrop-blur-sm md:mt-0 md:h-20 md:w-56 md:font-medium"
          >
            Save Changes
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Generatereport;