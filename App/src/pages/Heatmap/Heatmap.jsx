import React, { useEffect, useState, useRef } from "react";
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
  const socketRef = useRef(null);  // Add this ref to track current socket

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
      localStorage.setItem("startDate", value); // Store start date in local storage
    } else if (name === "enddate") {
      setEndDate(value);
      localStorage.setItem("endDate", value); // Store end date in local storage
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
    let currentUserId = localStorage.getItem("id");
    const accessToken = localStorage.getItem("accessToken");

    const createSocket = (userId) => {
      
      const newSocket = io(process.env.REACT_APP_WEBSOCKET_URL, {
        auth: { accessToken, userId },
      });

      newSocket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err);
        setError("Failed to connect to the WebSocket server.");
      });

      socketRef.current = newSocket;  // Update ref with new socket
      return newSocket;
    };

    const initialSocket = createSocket(currentUserId);
    setSocket(initialSocket);

    const intervalId = setInterval(() => {
      const newUserId = localStorage.getItem("id");
     

      if (newUserId !== currentUserId) {
        console.log("UserId changed. Reconnecting socket...");
        currentUserId = newUserId;

        // Disconnect using ref instead of initialSocket
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        
        const updatedSocket = createSocket(newUserId);
        setSocket(updatedSocket);
        console.log("id finding=",newUserId);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      // Disconnect using ref instead of initialSocket
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  
  useEffect(() => {
    // Load initial data from localStorage
    const savedASide = localStorage.getItem('HeatmapASide');
    const savedBSide = localStorage.getItem('HeatmapBSide');
    const savedASiderange = localStorage.getItem('HeatmapASiderange');
    const savedBSiderange = localStorage.getItem('HeatmapBSiderange');
    
    if (savedASide) setASideData(JSON.parse(savedASide));
    if (savedBSide) setBSideData(JSON.parse(savedBSide));
    if (savedASiderange) setCombinedData(JSON.parse(savedASiderange));
    if (savedBSiderange) setCombinedData(JSON.parse(savedBSiderange));
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for ASide data
    socket.on("ASide", (data) => {
      console.log("Received ASide Data:", data);
      setASideData(data);
      localStorage.setItem("HeatmapASide", JSON.stringify(data));
    });

    // Listen for BSide data
    socket.on("BSide", (data) => {
      console.log("Received BSide Data:", data);
      setBSideData(data);
      localStorage.setItem("HeatmapBSide", JSON.stringify(data));
    });
    
    // for the 7 values for min and max in the table
    const handleData = (ASideData, BSideData) => {
      const mergedData = [
        ...ASideData.map((data) => ({ ...data, source: "ASiderange" })),
        ...BSideData.map((data) => ({ ...data, source: "BSiderange" })),
      ];
      const filteredData = mergedData.filter(data => 
        data.source === (switcherValue10 === "ASide" ? "ASiderange" : "BSiderange")
      );
      setCombinedData(filteredData);
    };

    // Listen for ASiderange and BSiderange data
    let ASideData = [];
    let BSideData = [];

    socket.on("ASiderange", (data) => {
      console.log("Received ASiderange Data:", data);
      if (Array.isArray(data)) {
        ASideData = data; // Store ASiderange data
        localStorage.setItem("HeatmapASiderange", JSON.stringify(data));
        handleData(ASideData, BSideData);
      }
    });

    socket.on("BSiderange", (data) => {
      console.log("Received BSiderange Data:", data);
      if (Array.isArray(data)) {
        BSideData = data; // Store BSiderange data
        localStorage.setItem("HeatmapBSiderange", JSON.stringify(data));
        handleData(ASideData, BSideData);
      }
    });

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

  // Retrieve dates from local storage on component mount
  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(storedStartDate);
    }
    if (storedEndDate) {
      setEndDate(storedEndDate);
    }
  }, []);

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar onLogout={() => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      }} />

      
      <div className="flex  bg-[rgba(16,16,16,0.75)]  md:h-[87%] m-4 rounded-lg border border-white flex-col  text-white">
        <div className="md:h-[40%] h-[1140px] grid grid-row md:grid-col  md:w-full rounded-tr-lg rounded-tl-lg ">
          <div className="md:h-[100%] h-[130px]">
            <div className="flex flex-col px-10 py-4 md:h-full md:justify-between">
              <p className="flex justify-start mb-2 text-2xl font-semibold md:h-[40%]">
                Collector Bar
              </p>
              <div className="flex flex-col md:flex-row justify-between md:h-[60%] px-4 h-[400px]">
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
                  className=" md:w-[9%] h-[75%] text-md  text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />

                <p className="mt-3 text-lg">To</p>

                <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  value={endDate}
                  onChange={handleDateChange}
                  className="md:w-[9%] h-[75%] text-md text-white bg-[rgba(0,0,0,0.6)]  border border-gray-200 rounded-md shadow-sm p-1 custom-datepicker"
                />
                <p className="mt-3 text-lg">Current Date</p>

                <div className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg mb-5 h-10 md:mb-0 md:w-[9%] md:h-[75%] items-center justify-center flex flex-col">
                  <p className="text-xl font-semibold ">
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
           <div className="md:h-[90%] h-[180px]">
            <div className="flex flex-col justify-between md:h-full h-[520px] px-10 py-4 ">
              <p className="flex justify-start mb-2 text-2xl font-semibold md:h-[40%]">
                {switcherValue === "max" ? "Extreme Max" : "Extreme Min"}
              </p>

              <div className="flex flex-col md:flex-row  justify-between w-auto md:w-auto md:h-[60%] px-4 gap-6">
                {combinedData.length > 0 ? (
                  combinedData.map((data, index) => (
                    <div
                      key={index}
                      className="bg-[rgba(16,16,16,0.8)] border border-white rounded-lg md:w-[9%] h-[100%] items-center justify-center flex flex-col"
                    >
                      <p className=" text-sm md:text-xl text-[rgb(39,129,255)] font-semibold">
                        {data.value || "N/A"}
                      </p>
                      <p>
                      {switcherValue === "max" ? "Max of" : "Min of"}{" "}
                        <span className="text-sm text-white md:text-md">
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
        <div className="md:h-[60%] flex rounded-br-lg rounded-bl-lg  overflow-x-auto overflow-y-auto  scrollbar-custom mx-8">
        <HeatmapTable
            data={switcherValue10 === "ASide" ? ASideData : BSideData}
          />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;