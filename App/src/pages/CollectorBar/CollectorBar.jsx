import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import bg from "../../Assets/images/bg.png";
// import Chartbar from "../../Assets/components/Dashboard/miscellaneous/chartbar";
import Chartline from "../../Assets/components/Dashboard/miscellaneous/chartline";
import { temp } from "../../Assets/components/Dashboard/data/data";
import CollectorBarTable from "../../Assets/components/CollectorBar/CollectorBarTable";
import axios from "axios";

const CollectorBar = () => {
  const [activeButton, setActiveButton] = useState("1W");
  const [selectedButton, setSelectedButton] = useState(null);
  const [dropdown, setSelectedDropdown] = useState("CBT1A1");
  const [collectorbar, setCollectorbar] = useState();
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
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
  });

  const [unitPreference, setUnitPreference] = useState("C");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleButtonSelect = (buttonId) => {
    setSelectedButton(buttonId);
  };

  useEffect(() => {
    // Get part from URL or localStorage
    const partFromURL = searchParams.get("part");
    const storedPart = localStorage.getItem("selectedDropdown");
  
    if (partFromURL) {
      setSelectedDropdown(partFromURL);
      localStorage.setItem("selectedDropdown", partFromURL); // Store in local storage
    } else if (storedPart) {
      setSelectedDropdown(storedPart);
    }
  }, [searchParams]);



  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL);
    setSocket(newSocket);

    // Handle connection errors
    newSocket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      setError("Failed to connect to the WebSocket server.");
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);



  useEffect(() => {
    if (!socket || !dropdown) return;

    const handleCollectorbarData = (data) => {
      console.log("Received Collector Bar Data:", data);
      setCollectorbar(data);
      const tableData = Array.isArray(data?.data) ? data.data : [];

      // Transform the data for the chart
      const labels = tableData.map((item) =>
        new Date(item.createdAt).toLocaleTimeString()
      );
      const temperatures = tableData.map((item) => parseFloat(item[dropdown]));

      setUserData((prevData) => ({
        ...prevData,
        labels: labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: temperatures,
          },
        ],
      }));
    };

    socket.on("collectorBarData", handleCollectorbarData);

    const requestData = {
      value: dropdown,
      date: activeButton,
    };
    console.log("Emitting requestedCollectorbar:", requestData);
    socket.emit("requestedCollectorbar", requestData);

    return () => {
      socket.off("collectorBarData", handleCollectorbarData);
    };
  }, [socket, dropdown, activeButton]);

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
            const timestamp = userData.labels[index];
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold",
          color: "#fff",
        },
        bodyFont: {
          size: 12,
          color: "#fff",
        },
        padding: 10,
        borderWidth: 1,
        borderColor: "#00c8ff",
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

  const [fetchedOptions, setFetchedOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}api/v2/getcbname`
        );
        setFetchedOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions();
  }, []);


  
  // Calculate min, max, and average values from collectorbar data
  const minValue = collectorbar
    ? Math.min(...collectorbar.data.map((item) => parseFloat(item[dropdown])))
    : 0;
  const maxValue = collectorbar
    ? Math.max(...collectorbar.data.map((item) => parseFloat(item[dropdown])))
    : 0;
  const avgValue = collectorbar
    ? (
        collectorbar.data.reduce(
          (acc, item) => acc + parseFloat(item[dropdown]),
          0
        ) / collectorbar.data.length
      ).toFixed(2)
    : 0;

  return (
    <div
      className="relative w-screen overflow-y-hidden bg-fixed bg-center bg-cover md:h-screen md:bg-center h-[1100px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="flex bg-[rgba(16,16,16,0.5)] md:h-[87%] h-[800px] m-4 rounded-lg border border-white flex-col">
        <div className="flex flex-col bg-black rounded-tl-lg rounded-tr-lg md:h-16 md:w-full md:flex-row">
          <select
            className="ml-5 text-white text-3xl font-bold font-['Inter'] bg-transparent border-b border-white focus:outline-none"
            value={dropdown} // Set selected value
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedDropdown(selectedValue);
              localStorage.setItem("selectedDropdown", selectedValue); // Store in local storage
            }}
          >
            {fetchedOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                className="text-white bg-black"
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex md:h-full">
          <div className=" md:w-[80%] md:h-[100%] p-4">
            <div className="md:w-[100%] md:h-[10%] bg-[#101010]/80 rounded-lg shadow-[0px_8px_21.5px_0px_rgba(0,0,0,0.33)] flex justify-between">
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-semibold font-['Inter'] mr-10">
                  Max Value
                </div>
                <div className="text-[#0084fe] text-3xl font-bold font-['Inter'] ml-4">
                  {maxValue}°C
                </div>
              </div>
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-medium font-['Inter'] mr-10">
                  Min Value
                </div>
                <div className="text-[#0084fe] ml-4 text-3xl font-bold font-['Inter']">
                  {minValue}°C
                </div>
              </div>
              <div className="flex items-center mx-auto">
                <div className="text-white text-[26px] flex justify-between font-medium font-['Inter'] mr-10">
                  Avg Value
                </div>
                <div className="text-[#0084fe] ml-4 text-3xl font-bold font-['Inter']">
                  {avgValue}°C
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
                  <button
                    className={`text-blue-700 ${
                      activeButton === "30Min" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("30Min")}
                  >
                    30Min
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "1H" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("1H")}
                  >
                    1H
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "12H" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("12H")}
                  >
                    12H
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "1D" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("1D")}
                  >
                    1D
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "1W" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("1W")}
                  >
                    1W
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "1M" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("1M")}
                  >
                    1M
                  </button>
                  <button
                    className={`text-blue-700 ${
                      activeButton === "6M" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonClick("6M")}
                  >
                    6M
                  </button>
                </div>
                <div className="flex md:w-[10%] items-center justify-evenly" />
                <div className="flex md:w-[30%] items-center justify-evenly">
                  <button
                    disabled
                    className={`text-blue-700 ${
                      selectedButton === "I" ? "bg-blue-700 text-white " : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonSelect("I")}
                  >
                    I
                  </button>
                  <button
                    disabled
                    className={`text-blue-700 ${
                      selectedButton === "II" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonSelect("II")}
                  >
                    II
                  </button>
                  <button
                    disabled
                    className={`text-blue-700 ${
                      selectedButton === "III" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonSelect("III")}
                  >
                    III
                  </button>
                  <button
                    disabled
                    className={`text-blue-700 ${
                      selectedButton === "IV" ? "bg-blue-700 text-white" : ""
                    } border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
                    onClick={() => handleButtonSelect("IV")}
                  >
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
                  <input 
                    type="radio" 
                    id="radio1" 
                    name="unit" 
                    value="C" 
                    checked={unitPreference === "C"} 
                    onChange={() => setUnitPreference("C")} 
                  />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (°C)
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="radio2" 
                    name="unit" 
                    value="F" 
                    checked={unitPreference === "F"} 
                    onChange={() => setUnitPreference("F")} 
                  />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (°F)
                  </div>
                </div> */}
                {/* <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="radio3" 
                    name="unit" 
                    value="K" 
                    checked={unitPreference === "K"} 
                    onChange={() => setUnitPreference("K")} 
                  />
                  <div className="w-[29px] text-white text-sm font-medium font-['Inter']">
                    (K)
                  </div>
                </div> */}
              </div>
            </div>

            <div className="md:h-[76%] md:my-8 2xl:my- bg-[#101010]/90 rounded-lg border border-white overflow-x-scroll  scrollbar-custom ">
              <CollectorBarTable data={collectorbar} />
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
