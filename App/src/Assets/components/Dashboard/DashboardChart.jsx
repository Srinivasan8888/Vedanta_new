import React, { useState, useEffect, useMemo } from "react";
import Switcher13 from "./miscellaneous/Switcher13.jsx";
import Chartline from "./miscellaneous/chartline.jsx";
import Chartbar from "./miscellaneous/chartbar.jsx";
import 'chartjs-plugin-annotation';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all necessary components and plugins
ChartJS.register(...registerables, annotationPlugin);

const DashboardChart = ({ socketData = [], onChartClick }) => {
  
  const [potId, setPotId] = useState('');
  const [isBarChart, setIsBarChart] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      borderColor: "rgb(0, 119, 228)",
      backgroundColor: "rgba(0, 119, 228, 0.1)",
      tension: 0,
      fill: true,
      borderWidth: 4,
      // pointStyle: false,
    }]
  });
  
  const [previousSocketData, setPreviousSocketData] = useState(socketData);
  const [selectedButton, setSelectedButton] = useState(localStorage.getItem('selectedButton') || '1D');
  
  // console.log('chartsocket', socketData);
  
  useEffect(() => {    
    // if (!socketData?.data?.length) {
    //   console.log('No socket data available yet');
    //   return;
    // }
    
    if (socketData && socketData.data && socketData.data.length > 0) {
      setPreviousSocketData(socketData);
    }
  }, [socketData]);

  useEffect(() => {
    try {
      const chartData = {
        labels: previousSocketData.data.map(item => {
          const time = new Date(item.TIME).toLocaleTimeString();
          return time;
        }),
        datasets: [{
          data: previousSocketData.data.map(item => parseFloat(item.Avgtemp).toFixed(2)),
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
        }]
      };
      
      // console.log('Processed chart data:', chartData);
      setChartData(chartData);
      
      // console.log('Min Avg Temp:', socketData.minAvgTemp);
      // console.log('Max Avg Temp:', socketData.maxAvgTemp);
    } catch (error) {
      console.error('Error processing socket data:', error);
    }
  }, [previousSocketData]);

  const handleClick = (event) => {
    const buttonId = event.target.id;
    setSelectedButton(buttonId);
    localStorage.setItem('selectedButton', buttonId); // Store the selected button in local storage
    onChartClick(buttonId);
  };

  
  // const userData = {
  //   labels: temp.map((data) => data.month),
  //   datasets: [
  //     {
  //       data: temp.map((data) => data.temp),
  //       borderColor: "rgb(0, 119, 228)",
  //       backgroundColor: (context) => {
  //         const chart = context.chart;
  //         const { ctx, chartArea } = chart;
  //         if (!chartArea) return null;

  //         const gradient = ctx.createLinearGradient(
  //           0,
  //           chartArea.bottom,
  //           0,
  //           chartArea.top
  //         );
  //         gradient.addColorStop(0, "rgba(0, 119, 228, 0.1)");
  //         gradient.addColorStop(0.5, "rgba(0, 119, 228, 0.3)");
  //         gradient.addColorStop(1, "rgba(0, 119, 228, 0.8)");

  //         return gradient;
  //       },
  //       tension: 0,
  //       fill: true,
  //       borderWidth: 4,
  //     },
  //   ],
  // };

const options = useMemo(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    // tooltip: {
    //   callbacks: {
    //     title: function (value) {
    //       const timestamp = value[0].label || "No timestamp available";
    //       return `Timestamp: ${timestamp}`;
    //     },
    //     label: function (context) {
    //       return `Temperature: ${context.parsed.y.toFixed(2)}°C`;
    //     },
    //   },
    //   displayColors: false,
    //   backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background
    //   titleFont: {
    //     size: 14,
    //     weight: "bold",
    //     color: "#fff",
    //   },
    //   bodyFont: {
    //     size: 12,
    //     color: "#fff",
    //   },
    //   padding: 10, // Adjust padding
    //   borderWidth: 1,
    //   borderColor: "#00c8ff", // A matching border color
    // },
    tooltip: {
      enabled: false, // Disable the default tooltip
      external: function (context) {
        // Get the tooltip element or create it if it doesn't exist
        let tooltipEl = document.getElementById("chartjs-tooltip");
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.pointerEvents = "none";
          tooltipEl.style.backgroundColor = "rgba(0, 119, 228, 0.9)";
          tooltipEl.style.color = "#fff";
          tooltipEl.style.borderRadius = "8px";
          tooltipEl.style.width = "130px"; // Fixed width
          tooltipEl.style.height = "65px"; // Fixed height
          tooltipEl.style.padding = "10px";
          tooltipEl.style.fontSize = "14px";
          tooltipEl.style.textAlign = "center";
          tooltipEl.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip is active
        const tooltipModel = context.tooltip;
        console.log(tooltipModel);
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set tooltip content
        if (tooltipModel.body) {
          const title = tooltipModel.dataPoints[0].raw;
          const bodyLines = tooltipModel.title || [];

          let innerHtml = `<div style="font-size: 18px; font-weight: bold;">${title} °C</div>`;
          bodyLines.forEach((body) => {
            innerHtml += `<div style="font-size: 12px; margin-top: 5px;">${body}</div>`;
          });

          tooltipEl.innerHTML = innerHtml;
        }

        // Position the tooltip
        const { offsetLeft, offsetTop } = context.chart.canvas;
        tooltipEl.style.left = offsetLeft + tooltipModel.caretX + "px";
        tooltipEl.style.top = offsetTop + tooltipModel.caretY + "px";
        tooltipEl.style.opacity = 1;
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 240,
          yMax: 240,
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [5, 5], // Dotted line
          label: {
            content: 'Threshold',
            enabled: true,
            position: 'end',
            color: 'red',
          },
        },
      },
    },
  },
  scales: {
    y: {
      position: "right",
      title: {
        display: true,
        text: "Temperature (°C)",
        color: "white",
        pointStyle: false,
      },
      ticks: {
        padding: 20,
        color: "white",
        callback: function(value) {
          return value.toFixed(2) + " °C";
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
  elements: {
    point: {
      radius: 1, // Default radius
      hoverRadius: 7, // Radius on hover
      pointStyle: 'circle', // Default point style
      hoverPointStyle: 'circle', // Point style on hover
    },
  },
}), []);


  const toggleChartType = () => {
    setIsBarChart(!isBarChart);
  };
  
// ... existing code ...

// Register tooltip plugin
const tooltipPlugin = {
  id: "hoverline",
  beforeDraw: (chart) => {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const tooltip = chart.tooltip._active[0];
      const x = tooltip.element.x;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, chart.scales.y.top);
      ctx.lineTo(x, chart.scales.y.bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx.restore();
    }
  },
};
ChartJS.register(tooltipPlugin);

// Register danger line plugin
const dangerLinePlugin = {
  id: "dangerLine",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const yAxis = chart.scales.y;
    const xAxis = chart.scales.x;

    // Get the y-coordinate for value 800
    const yValue = yAxis.getPixelForValue(80);

    ctx.save();
    ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(xAxis.left, yValue);
    ctx.lineTo(xAxis.right, yValue);
    ctx.stroke();
    ctx.restore();
  },
};
ChartJS.register(dangerLinePlugin);

  useEffect(() => {
    setInterval(() => {
    const handleStorageChange = () => {
      const id = window.localStorage.getItem('id');
      setPotId(id);
    };

    // Initial load
    handleStorageChange();
    
    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };}, [500]);
  }, []);

// ... existing code ...
  
  return (
    <div className="h-[490px] lg:w-[96.8%] pt-2 xl:pt-0 xl:h-[90%] 2xl:h-auto lg:mt-2 xl:w-[73%]  2xl:w-[73%] 2xl:pt-1 bg-[rgba(16,16,16,0.9)] m-4 rounded-xl text-white">
      {/* <div className="w-full h-full backdrop-blur-sm"> */}
        <div className="h-[180px] md:h-[75%] w-[100%]">
          <div className="flex flex-col px-4 mt-4 xl:mt-0 md:flex-row md:justify-around">
            <p className="mt-2 mb-3 text-xl font-semibold text-center xl:text-base md:text-left md:mb-0 md:mt-0 ">
            {potId || 'N/A'}
            </p>

            <div className="flex flex-row justify-center gap-4 mt-1 md:flex-row md:gap-5 md:mx-10 md:space-y-0 ">
              <p className="text-sm md:text-base xl:text-base">
                Max Value:{" "}
                <span className="font-bold text-[rgba(0,119,228)] xl:text-base"> {socketData.maxAvgTemp ? `${socketData.maxAvgTemp}°C` : 'NaN'}</span>
              </p>
              <p className="text-sm md:text-base xl:text-base">
                Min Value:{" "}
                <span className="font-bold text-[rgba(0,119,228)] xl:text-base"> {socketData.minAvgTemp ? `${socketData.minAvgTemp}°C` : 'NaN'}</span>
              </p>
              <p className="text-sm md:text-base xl:text-base">
                Avg Value:{" "}
                <span className="font-bold text-[rgba(0,119,228)] xl:text-base"> {((socketData.minAvgTemp + socketData.maxAvgTemp) / 2).toFixed(2)}°C</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 md:justify-start md:mt-0">
              <Switcher13 toggleChartType={toggleChartType} />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-xs md:text-sm xl:text-xs 2xl:text-sm px-3 md:px-4 xl:px-3 2xl:px-4 py-1.5 md:py-2 xl:py-1.5 2xl:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Export
              </button>
            </div>
          </div>

          <div className="w-full h-full">
            {isBarChart ? (
              <Chartbar chartData={chartData} options={options} />
            ) : (
              <Chartline chartData={chartData} width={"100%"} options={options} />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pb-2 md:mt-1 md:justify-around">
            {['1D', '3D', '1W', '1M', '6M'].map((id) => (
              <button
                key={id}
                type="button"
                id={id}
                onClick={handleClick}
                className={`w-20 md:w-16 xl:h-8 xl:w-24 2xl:w-28 2xl:h-12 
                  ${selectedButton === id ? 'text-white bg-blue-700 hover:bg-blue-800' : 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800'} 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-[10px] 2xl:text-sm 
                  px-2 md:px-1.5 2xl:px-4 py-1 md:py-1 2xl:py-2.5 text-center 
                  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
              >
                {id === '1D' ? '1 Day' : id === '3D' ? '3 Days' : id === '1W' ? '1 Week' : id === '1M' ? '1 Month' : '6 Months'}
              </button>
            ))}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default DashboardChart;
