import React, { useState } from "react";
import Switcher13 from "./miscellaneous/Switcher13.jsx";
import Chartline from "./miscellaneous/chartline.jsx";
import Chartbar from "./miscellaneous/chartbar.jsx";
import { temp } from './data/data.js'
const DashboardChart = () => {
  const [isBarChart, setIsBarChart] = useState(false);

  const userData = {
    labels: temp.map((data) => data.month),
    datasets: [{
      data: temp.map((data) => data.temp),
      borderColor: "rgb(0, 119, 228)",
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(0, 119, 228, 0.1)');
        gradient.addColorStop(0.5, 'rgba(0, 119, 228, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 119, 228, 0.8)');
        
        return gradient;
      },
      tension: 0,
      fill: true,
      borderWidth: 4
    }],
  };
  
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false  
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            
            const index = context[0].dataIndex;
            const timestamp = temp[index].timestamp; 
            return `Timestamp: ${timestamp}`;
          },
          label: function(context) {
           
            return `Temperature: ${context.parsed.y}°C`;
          },
          afterLabel: function(context) {
           
            return 'Hover for details!';
          }
        },
        displayColors: false, 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Custom background
        titleFont: {
          size: 14,
          weight: 'bold',
          color: '#fff'
        },
        bodyFont: {
          size: 12,
          color: '#fff'
        },
        padding: 10, // Adjust padding
        borderWidth: 1,
        borderColor: '#00c8ff' // A matching border color
      }
    },
    scales: {
      y: {
        position: 'right',
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: 'white'
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return value + ' °C';
          }
        },
      },
      x: {
        title: {
          display: true,
          text: 'Timestamp',
          color: 'white'
        },
        ticks: {
          color: 'white'
        },
      }
    }
  };
  
  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };

  return (
    <div className="h-[460px] md:h-auto md:w-[50%] bg-[rgba(16,16,16,0.9)] m-4 rounded-xl text-white">
      <div className="flex flex-col px-4 mt-4 md:flex-row md:justify-around">
        <p className="mt-2 mb-3 text-xl font-semibold text-center md:text-left md:mb-0 md:mt-0">CBTA1</p>

        <div className="flex flex-row justify-center gap-4 mt-1 md:flex-row md:gap-5 md:mx-10 md:space-y-0 ">
          <p className="text-sm md:text-base">
            Max Value: <span className="font-bold text-[rgba(0,119,228)]"> 930°C</span>
          </p>
          <p className="text-sm md:text-base">
            Min Value: <span className="font-bold text-[rgba(0,119,228)]"> 930°C</span>
          </p>
          <p className="text-sm md:text-base">
            Avg Value: <span className="font-bold text-[rgba(0,119,228)]">  930°C</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 md:justify-start md:mt-0">
          <Switcher13 toggleChartType={toggleChartType} />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Export
          </button>
        </div>
      </div>

      <div className="h-[180px] md:h-[75%] w-[100%]">
        
        <div className="w-full h-full">
          {isBarChart ? (
            <Chartbar chartData={userData} options={options} />
          ) : (
            <Chartline chartData={userData} width={"100%"} options={options} />
          )}

        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-1 md:justify-around">
          <button
            type="button"
            className="w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            1 Day
          </button>
          <button
            type="button"
            className="w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            3 Days
          </button>
          <button
            type="button"
            className="w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            1 week
          </button>
          <button
            type="button"
            className="w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            1 Month
          </button>
          <button
            type="button"
            className="w-28 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 col-span-2 md:col-span-1"
          >
            6 Months
          </button>
        </div>
      </div>








    </div>
  );
};

export default DashboardChart;
