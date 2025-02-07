import React, { useEffect, useState } from "react";
import bg from "../../Assets/images/bg.png";
import ThreeScene from "../../Assets/model/ThreeModel.jsx";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import Notifications from "../../Assets/components/Dashboard/Notifications";
import Aside from "../../Assets/components/Dashboard/Aside";
import Bside from "../../Assets/components/Dashboard/Bside";
import DashboardChart from "../../Assets/components/Dashboard/DashboardChart";
import io from "socket.io-client";



const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [AsideData, setAsidedata] = useState([]);
  const [BsideData, setBsidedata] = useState([]);
  const [ModelData, setModelData] = useState([]);
  const [latesttimestamp, setLatestTimestamp] = useState([]);
  const [AvgData, setAvgData] = useState([]);
  const [ModelTempData, setModelTempData] = useState([]);
  const [lastButtonClicked, setLastButtonClicked] = useState(null);
  const [error, setError] = useState(null); // Store error messages
  
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
    
    socket.on("ASide", (data) => {
      // Handle object format with data array
      console.log("recevied Aside Data", data)
      setAsidedata(data);
    });
    
    socket.on("BSide", (data) => {
      // Handle object format with data array
      console.log("recevied Bside Data", data)
      setBsidedata(data);
    });
    
    socket.on("LatestTimestamp", (data) => {
      setLatestTimestamp(data);
    });

    socket.on("AllData", (data) => {
      if (Array.isArray(data)) {
        setModelData(data);
        // console.log("Received All Model Data:", data);
      }
    });

    socket.on("Avgtempdata", (data) => {
      // console.log("data for avg temp", data);
      if (data) {
        setAvgData(data);
      }
    });

    socket.on("AvgModeltemp", (data) => {
      // console.error("AvgModeltemp data not received:", data);
      setModelTempData(data);
    });

    
    return () => {
      socket.off("ASide");
      socket.off("BSide");
      socket.off("LatestTimestamp");
      socket.off("AllData");
      socket.off("Avgtempdata");
      socket.off("AvgModeltemp");
      socket.disconnect();
    };    
  }, [socket]);

  const handleChartClick = (buttonId) => {
    // console.log("Button clicked in DashboardChart:", buttonId);
    socket.emit("ButtonClick", buttonId);
    setLastButtonClicked(buttonId);
  };

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar style={{ zIndex: 9999, position: 'relative' }} />
      
      <div className="md:h-[45%] md:flex gap-5">
        <ThreeScene socketData={ModelData} ModelTempData={ModelTempData} lastButtonClicked={lastButtonClicked} latesttimestamp={latesttimestamp}/>
        {/* <Notifications /> */}
        <Aside socketData={AsideData} />
      </div>
      <div className="md:h-[45%] md:flex gap-5">
        <DashboardChart socketData={AvgData} onChartClick={handleChartClick} />

        <Bside socketData={BsideData} />
      </div>
    </div>
  );
};

export default Dashboard;
