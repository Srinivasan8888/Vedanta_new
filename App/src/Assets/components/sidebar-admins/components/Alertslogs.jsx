import React from "react";

const Alertslogs = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col flex-1 gap-4 px-4 py-4">
        <div className="h-full rounded-2xl border-2 border-white bg-[rgba(16,16,16,0.75)] backdrop-blur-sm">
          <div className="lg:flex md:h-[10%] items-center justify-between px-6">
            <div className="flex gap-10">
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-blue-700 p-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <span className="sr-only">Add User</span>
              </button>
              
             
            </div>
            <div className="items-center justify-start font-['Poppins'] text-3xl font-semibold text-white">
              Alert Logs
            </div>
      
            <div className="gap-10 lg:flex justify-evenly">
              <div className="flex h-14 w-full items-center justify-center gap-5 rounded-lg bg-[#101010] px-4 text-white">
                <p className="font-['Poppins'] text-lg font-semibold">From</p>
                <div className="rounded bg-[#3b3b3b]">
                  <input type="Date" />
                </div>
                <p className="font-['Poppins'] text-lg font-semibold">To</p>
                <div className="rounded bg-[#3b3b3b]">
                  <input type="Date" />
                </div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-10"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-center">
                {" "}
                <button
                  type="button"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-center text-sm text-black backdrop-blur-sm md:mt-0 h-11 w-28 md:font-medium"
                >
                  <span className="justify-start font-['Poppins'] text-lg font-medium text-black">
                    Export
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="scrollbar-customd m-4 md:h-[86%] overflow-x-auto rounded-2xl bg-[#101010]/90 backdrop-blur-sm">
            <div className="min-w-[30px] overflow-x-auto">
              <table className="w-full text-white">
                <thead className="sticky top-0 bg-[#101010]/90 text-base backdrop-blur-sm">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center whitespace-nowrap"
                    >
                      Logs
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center whitespace-nowrap"
                    >
                      TimeStamp
                    </th>
                    {/* <th
                      scope="col"
                      className="px-4 py-3 text-center whitespace-nowrap"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center whitespace-nowrap"
                    >
                      Status
                    </th> */}
                    {/* <th
                      scope="col"
                      className="px-4 py-3 text-center whitespace-nowrap"
                    >
                      {" "}
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">1234567890</td>
                    {/* <td className="px-4 py-4">
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
                    </td> */}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">1234567890</td>
                    {/* <td className="px-4 py-4">
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
                    </td> */}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">1234567890</td>
                    {/* <td className="px-4 py-4">
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
                    </td> */}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">1234567890</td>
                    {/* <td className="px-4 py-4">
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
                    </td> */}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">John Doe</td>
                    <td className="px-4 py-4">1234567890</td>
                    {/* <td className="px-4 py-4">
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
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alertslogs;
