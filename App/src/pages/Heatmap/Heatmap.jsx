import React from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar.jsx";
import Switcher10 from "../../Assets/components/Heatmap/Switcher10";
import Switcher9 from "../../Assets/components/Heatmap/Switcher9";
import HeatmapTable from "../../Assets/components/Heatmap/HeatmapTable";

const Heatmap = () => {
  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      <div className="flex  bg-[rgba(16,16,16,0.75)] h-[840px] md:h-[87%] m-4 rounded-lg border border-white flex-col text-white">
        <div className="md:h-[35%] h-[336px] grid grid-rows-2  md:w-full rounded-tr-lg rounded-tl-lg ">
          <div className="md:h-[100%]">
            <div className="flex flex-col justify-between h-full px-10 py-4">
              <p className="flex justify-start mb-2 text-2xl font-semibold md:h-[40%]">
                Collector Bar
              </p>
              <div className="flex justify-between md:h-[60%] px-4">
                <p>
                  <Switcher10 />
                </p>
                <p className="flex mt-3 text-xl font-semibold">Select Date</p>
                <p className="mt-3 text-lg">From</p>

                <input
                  type="date"
                  id="startdate"
                  name="startdate"
                  className="w-[9%] h-[75%] text-md  text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />

                <p className="mt-3 text-lg">To</p>

                <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  className="w-[9%] h-[75%] text-md text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />
                <p className="mt-3 text-lg">Current Date</p>

                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[75%] items-center justify-center flex flex-col">
                  <p className="text-xl font-semibold">12 Jan 2024</p>
                </div>

                <p>
                  <Switcher9 />
                </p>
              </div>
            </div>
          </div>
          <div className="md:h-[100%]">
            <div className="flex flex-col justify-between h-full px-10 py-4">
              <p className="flex justify-start mb-2 text-2xl font-semibold md:h-[40%]">
                Extremely Low
              </p>
              <div className="flex justify-between md:h-[60%] px-4 gap-6">
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                  <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                    112.19
                  </p>
                  <p>CBT1A2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-[65%] h-[504px] flexmd:w-full rounded-br-lg rounded-bl-lg  overflow-x-auto overflow-y-auto  scrollbar-custom">
          <HeatmapTable />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
