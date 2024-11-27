import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = () => {

  const data = {
    labels: [
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
      "20:00 - 21:00",
      "21:00 - 22:00",
      "22:00 - 23:00",
      "23:00 - 24:00",
    ],
    datasets: [
      {
        label: "Avg T1",
        data: [600, 580, 570, 550, 530, 510, 500, 480, 470, 460],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
      },
      {
        label: "Avg T2",
        data: [900, 870, 850, 820, 800, 780, 750, 740, 730, 720],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}°C`; // Add °C unit
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
        },
      },
      y: {
        position: 'right',
        ticks: {
          color: "white",
          callback: function (value) {
            return `${value}°C`; // Add °C unit
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.5)",
          drawOnChartArea: false,
        },
      },
    },
  };
  return (
    <>
      <Line data={data} options={options} />
      
    </>
  );
};

export default AnalyticsChart;
