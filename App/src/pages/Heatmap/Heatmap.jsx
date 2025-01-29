import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar.jsx";
import Switcher10 from "../../Assets/components/Heatmap/Switcher10";
import Switcher9 from "../../Assets/components/Heatmap/Switcher9";
import HeatmapTable from "../../Assets/components/Heatmap/HeatmapTable";

const Heatmap = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [switcherValue, setSwitcherValue] = useState("min");
  const [switcherValue10, setSwitcherValue10] = useState("ASide");
  const [ASideData, setASideData] = useState([]); // Store ASide data
  const [BSideData, setBSideData] = useState([]); // Store BSide data
  const [combinedData, setCombinedData] = useState([]); 
  const [combinedTableData, setCombinedTableData] = useState([]); 
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null); // Store error messages

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
      // console.log("Start Date:", value);
    } else if (name === "enddate") {
      setEndDate(value);
      // console.log("End Date:", value);
    }
  };

  const handleSwitcherValueChange = (newValue) => {
    setSwitcherValue(newValue);
    // console.log("Switcher Value of value:", newValue);
  };

  // console.log("Combined Table Data:", ASideData);


  const handleSwitcherValueChange10 = (newValue) => {
    setSwitcherValue10(newValue);
    // console.log("Switcher Value10 of side:", newValue);
  };

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
    if (!socket) return;

    // Listen for ASide data
    socket.on("ASide", (data) => {
      console.log("Received ASide Data:", data);
      setASideData(data);
      localStorage.setItem("ASideData", JSON.stringify(data)); // Store ASide data in local storage
    });

    // Listen for BSide data
    socket.on("BSide", (data) => {
      console.log("Received BSide Data:", data);
      setBSideData(data);
      localStorage.setItem("BSideData", JSON.stringify(data)); // Store BSide data in local storage
    });
    





    
    // let ASideTableData = []; // Initialize ASideTableData
    // let BSideTableData = []; // Initialize BSideTableData

    // // Function to handle the combined data
    // const handleTableData = () => {
    //   const mergedData = [
    //     ...ASideTableData.map((data) => ({ ...data, source: "ASide" })), // Tag ASide data
    //     ...BSideTableData.map((data) => ({ ...data, source: "BSide" })), // Tag BSide data
    //   ];
    //   console.log("Merged Data:", mergedData);
    //   setCombinedTableData(mergedData);
    // };

    // Listen for ASide data
    // socket.on("ASide", (data) => {
    //   console.log("Received ASide Table Data:", data);
    //   if (Array.isArray(data)) {
    //     setCombinedTableData(data); // Store ASideTableData in combinedTableData
    //   }
    // });

    // // Listen for BSide data
    // socket.on("BSide", (data) => {
    //   console.log("Received BSide Table Data:", data);
    //   if (Array.isArray(data)) {
    //     setCombinedTableData(data); // Store BSideTableData in combinedTableData
    //   }
    // });

    



    // for the 7 values for min and max in the table
    const handleData = (ASideData, BSideData) => {
      const mergedData = [
        ...ASideData.map((data) => ({ ...data, source: "ASiderange" })), // Add source identifier
        ...BSideData.map((data) => ({ ...data, source: "ASiderange" })),
      ];
      setCombinedData(mergedData);
    };

    // Listen for ASiderange and BSiderange data
    let ASideData = [];
    let BSideData = [];

    socket.on("ASiderange", (data) => {
      // console.log("Received ASiderange Data:", data);
      if (Array.isArray(data)) {
        ASideData = data; // Store ASiderange data
        handleData(ASideData, BSideData);
      }
    });

    socket.on("BSiderange", (data) => {
      // console.log("Received BSiderange Data:", data);
      if (Array.isArray(data)) {
        BSideData = data; // Store BSiderange data
        handleData(ASideData, BSideData);
      }
    });

    // Retrieve data from local storage if no new data is available
    const storedASideData = JSON.parse(localStorage.getItem("ASideData")) || [];
    const storedBSideData = JSON.parse(localStorage.getItem("BSideData")) || [];
    
    if (ASideData.length === 0) {
      setASideData(storedASideData);
    }
    if (BSideData.length === 0) {
      setBSideData(storedBSideData);
    }

    // Automatically fetch data when the socket is connected or when dependencies change
    const requestData = {
      value: switcherValue,
      startDate: startDate,
      endDate: endDate,
      side: switcherValue10, // This should trigger the effect when it changes
    };

    socket.emit("requestrangedata", requestData);
    console.log(requestData);
    socket.emit("requestData", requestData);

    // Cleanup listeners
    return () => {
      socket.off("ASide");
      socket.off("BSide");
      socket.off("ASiderange");
      socket.off("BSiderange");
    };
  }, [socket, switcherValue, startDate, endDate, switcherValue10]); // Ensure switcherValue10 is included

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
                  <Switcher10 onValueChange10={handleSwitcherValueChange10} />
                </p>
                <p className="flex mt-3 text-xl font-semibold">Select Date</p>
                <p className="mt-3 text-lg">From</p>

                <input
                  type="date"
                  id="startdate"
                  name="startdate"
                  value={startDate}
                  onChange={handleDateChange}
                  className="w-[9%] h-[75%] text-md  text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />

                <p className="mt-3 text-lg">To</p>

                <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  value={endDate}
                  onChange={handleDateChange}
                  className="w-[9%] h-[75%] text-md text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />
                <p className="mt-3 text-lg">Current Date</p>

                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[75%] items-center justify-center flex flex-col">
                  <p className="text-xl font-semibold">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <p>
                  <Switcher9 onValueChange={handleSwitcherValueChange} />
                </p>
              </div>
            </div>
          </div>
          <div className="md:h-[100%]">
            <div className="flex flex-col justify-between h-full px-10 py-4">
              <p className="flex justify-start mb-2 text-2xl font-semibold md:h-[40%]">
                {switcherValue === "max" ? "Extreme Max" : "Extreme Max"}
              </p>

              <div className="flex justify-between md:h-[60%] px-4 gap-6">
                {combinedData.length > 0 ? (
                  combinedData.map((data, index) => (
                    <div
                      key={index}
                      className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col"
                    >
                      <p className="text-xl text-[rgb(39,129,255)] font-semibold">
                        {data.value || "N/A"}
                      </p>
                      <p>
                      {switcherValue === "max" ? "Max of" : "Min of"}{" "}
                        <span className="text-white">
                          {data.key || "Data"}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    {[...Array(7)].map((_, index) => (
                      <div key={index} className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg w-[9%] h-[100%] items-center justify-center flex flex-col">
                        <div className="text-xl text-[rgb(39,129,255)] font-semibold">No Data Available</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-[65%] h-[504px] flexmd:w-full rounded-br-lg rounded-bl-lg  overflow-x-auto overflow-y-auto  scrollbar-custom mx-8">
        <HeatmapTable
            data={switcherValue10 === "ASide" ? ASideData : BSideData}
          />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
