import React, { useState } from "react";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import bg from "../../Assets/images/bg.png";
// import Chartbar from "../../Assets/components/Dashboard/miscellaneous/chartbar";
import Chartline from "../../Assets/components/Dashboard/miscellaneous/chartline";
import { temp } from "../../Assets/components/Dashboard/data/data";
import CollectorBarTable from "../../Assets/components/CollectorBar/CollectorBarTable";

const CollectorBar = () => {
  const userData = {
    labels: temp.map((data) => data.month),
    datasets: [
      {
        data: temp.map((data) => data.temp),
        borderColor: "rgb(0, 119, 228)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(0, 119, 228, 0.1)");
          gradient.addColorStop(0.5, "rgba(0, 119, 228, 0.3)");
          gradient.addColorStop(1, "rgba(0, 119, 228, 0.8)");

          return gradient;
        },
        tension: 0,
        fill: true,
        borderWidth: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            const timestamp = temp[index].timestamp;
            return `Timestamp: ${timestamp}`;
          },
          label: function (context) {
            return `Temperature: ${context.parsed.y}°C`;
          },
          afterLabel: function (context) {
            return "Hover for details!";
          },
        },
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background
        titleFont: {
          size: 14,
          weight: "bold",
          color: "#fff",
        },
        bodyFont: {
          size: 12,
          color: "#fff",
        },
        padding: 10, // Adjust padding
        borderWidth: 1,
        borderColor: "#00c8ff", // A matching border color
      },
    },
    scales: {
      y: {
        position: "right",
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "white",
        },
        ticks: {
          color: "white",
          callback: function (value) {
            return value + " °C";
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Timestamp",
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div
      className="relative w-screen overflow-y-hidden bg-fixed bg-center bg-cover md:h-screen md:bg-center h-[1100px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="flex bg-[rgba(16,16,16,0.5)] md:h-[87%] h-[800px] m-4 rounded-lg border border-white flex-col">
        <div className="flex flex-col bg-black rounded-tl-lg rounded-tr-lg md:h-16 md:w-full md:flex-row">
          <div className="text-white text-3xl font-bold font-['Inter'] flex items-center ml-5">
            CBT1A1
          </div>
        </div>

        <div className="flex md:h-full">
          <div className=" md:w-[80%] md:h-[100%] p-4">
            <div className="md:w-[100%] md:h-[10%] bg-[#101010]/80 rounded-lg shadow-[0px_8px_21.5px_0px_rgba(0,0,0,0.33)] flex justify-between">
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-semibold font-['Inter'] mr-10">
                  Max Value
                </div>
                <div className="text-[#0084fe] text-3xl font-bold font-['Inter'] ml-4">
                  930°C
                </div>
              </div>
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-medium font-['Inter'] mr-10">
                  Min Value
                </div>
                <div className="text-[#0084fe] ml-4 text-3xl font-bold font-['Inter']">
                  618°C
                </div>
              </div>
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-medium font-['Inter'] mr-10">
                  Avg Value
                </div>
                <div className="text-[#0084fe] ml-4 text-3xl font-bold font-['Inter']">
                  820°C
                </div>
              </div>
            </div>
            <div className="md:w-[100%] md:h-[88%] 2xl:h-[88%]  bg-[#101010]/80 rounded-2xl backdrop-blur-blur mt-4">
              <div className="md:h-[10%] flex md:w-full">
                <div className="flex   md:w-[10%] items-center justify-around text-white">
                  <div className="text-white text-xl font-bold font-['Inter']">
                    TI
                  </div>
                </div>
                <div className="flex   md:w-[50%] items-center justify-around">
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    5Min
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    30Min
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    1H
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    12H
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    1D
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    1M
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    6M
                  </button>
                </div>
                <div className="flex md:w-[10%] items-center justify-evenly"/>
                <div className="flex md:w-[30%] items-center justify-evenly">
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    I
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    II
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    III
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    IV
                  </button>
                </div>
              </div>
              <div className=" md:h-[85%]">
                <div className="w-full h-full">
                  <Chartline
                    chartData={userData}
                    width={"100%"}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-[25%] md:h-[96%] m-4 bg-[#101010]/75 rounded-2xl backdrop-blur-blur text-white p-4">
            <div className="md:h-[8%]  bg-[#101010]/90 rounded-lg border border-white flex items-center justify-evenly">
              <div className="text-white text-lg font-semibold font-['Poppins']">
                Unit Preference
              </div>
              <div className="md:h-[76%] md:w-[40%] my-8 bg-[#101010]/90 rounded-lg flex items-center justify-evenly">
                <div className="flex items-center">
                  <input type="radio" id="radio1" name="radio" value="radio1" />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (°C)
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="radio2" name="radio" value="radio2" />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (°F)
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="radio3" name="radio" value="radio3" />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (K)
                  </div>
                </div>
              </div>
            </div>

            <div className="md:h-[76%] my-8 bg-[#101010]/90 rounded-lg border border-white overflow-x-scroll  scrollbar-custom ">
              <CollectorBarTable/>
            </div>

            <div className="md:h-[8%]  bg-[#101010]/90 rounded-lg border border-white flex items-center justify-evenly">
              <div className="text-white text-lg font-semibold font-['Poppins']">
                Last Update
              </div>
              <div className="text-white text-[15px] font-medium font-['Poppins']">
                09/01/2025,17:54:30
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorBar;
