import React, { useEffect, useState, useRef } from "react";
import bg from "../../Assets/images/bg.png";
import ThreeScene from "../../Assets/components/model/ThreeModel.jsx";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import Notifications from "../../Assets/components/Dashboard/Notifications";
import Aside from "../../Assets/components/Dashboard/Aside";
import Bside from "../../Assets/components/Dashboard/Bside";
import DashboardChart from "../../Assets/components/Dashboard/DashboardChart";
import AlertBox from "../../Assets/components/Dashboard/AlertBox"; // Import AlertBox
import io from "socket.io-client";
import isEqual from "lodash/isEqual";

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [AsideData, setAsidedata] = useState([]); // Data for A Side
  const [BsideData, setBsidedata] = useState([]); // Data for B Side
  const [ModelData, setModelData] = useState([]); // Data for 3D Model
  const [latesttimestamp, setLatestTimestamp] = useState([]); // Latest timestamp
  const [AvgData, setAvgData] = useState([]); // Average temperature data
  const [ModelTempData, setModelTempData] = useState([]); // Model temperature data
  const [lastButtonClicked, setLastButtonClicked] = useState(null); // Last button clicked in chart
  const [error, setError] = useState(null); // Error handling
  const [showAlert, setShowAlert] = useState(null); // State to show/hide alert

  const socketRef = useRef(null); // Ref to track current socket

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

      socketRef.current = newSocket; // Update ref with new socket
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
        console.log("id finding=", newUserId);
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

  // Listen for WebSocket events
  useEffect(() => {
    if (!socket) return;

    // Handle "ASide" event
    socket.on("ASideUpdate", (data) => {
      console.log("Received ASide Data:", data);
      const validData = Array.isArray(data) ? data : [];
      setAsidedata((prevData) => {
        if (!isEqual(validData, prevData)) {
          return validData;
        }
        return prevData;
      });
    });

    // Handle "BSide" event
    socket.on("BSideUpdate", (data) => {
      console.log("Received BSide Data:", data);
      const validData = Array.isArray(data) ? data : [];
      setBsidedata((prevData) => {
        if (!isEqual(validData, prevData)) {
          return validData;
        }
        return prevData;
      });
    });

    // Handle "LatestTimestamp" event
    socket.on("LatestTimestamp", (data) => {
      setLatestTimestamp(data);
    });

    // Handle "AllData" event
    socket.on("AllData", (data) => {
      // console.log("Received All Model Data:", data);
      if (Array.isArray(data)) {
        setModelData(data); // Update state only if data is an array
      } else {
        console.warn("Invalid AllData received:", data);
      }
    });
    
    // socket.on("AllData", (data) => {
    //   if (Array.isArray(data)) {
    //     setModelData(data);

    //     // Find the CBT part that exceeded the temperature limit
    //     let highTempPart = null;
    //     const hasHighTemperature = data.some((item) => {
    //       for (const [key, value] of Object.entries(item)) {
    //         if (key.startsWith('CBT') && parseFloat(value) >= 700) {
    //           highTempPart = key;
    //           return true;
    //         }
    //       }
    //       return false;
    //     });
    //     setShowAlert(hasHighTemperature && highTempPart); // Show alert if condition is met and we have the part name
    //   } else {
    //     console.warn("Invalid AllData received:", data);
    //   }
    // });

    // Handle "Avgtempdata" event
    socket.on("Avgtempdata", (data) => {
      if (data) {
        setAvgData(data);
      } else {
        console.warn("Invalid Avgtempdata received:", data);
      }
    });

    // Handle "AvgModeltemp" event
    socket.on("AvgModeltemp", (data) => {
      if (data) {
        setModelTempData(data);
      } else {
        console.warn("Invalid AvgModeltemp received:", data);
      }
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("ASideUpdate");
      socket.off("BSideUpdate");
      socket.off("LatestTimestamp");
      socket.off("AllData");
      socket.off("Avgtempdata");
      socket.off("AvgModeltemp");
      socket.disconnect();
    };
  }, [socket]);

  // Add this useEffect to monitor ModelData changes
  useEffect(() => {
    const checkTemperatureLimits = () => {
      if (!ModelData.length) return;

      // Find all parts exceeding temperature limit
      const highTempParts = ModelData.reduce((acc, item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (key.startsWith('CBT') && parseFloat(value) >= 700) {
            acc.push(key);
          }
        });
        return acc;
      }, []);

      setShowAlert(highTempParts.length > 0 ? highTempParts : null);
    };

    checkTemperatureLimits();
  }, [ModelData]);

  // Update your socket listener
  useEffect(() => {
    if (!socket) return;

    const handleAllData = (data) => {
      if (Array.isArray(data)) {
        setModelData(data);
        const timestamps = data.map(item => item.createdAt);
        setLatestTimestamp(timestamps);
      } else {
        console.warn("Invalid AllData received:", data);
      }
    };

    socket.on("AllData", handleAllData);

    return () => {
      socket.off("AllData", handleAllData);
    };
  }, [socket]);

  // Handle button clicks in the DashboardChart
  const handleChartClick = (buttonId) => {
    console.log("Button clicked in DashboardChart:", buttonId);
    socket.emit("ButtonClick", buttonId || "1M");
    setLastButtonClicked(buttonId);
  };

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover xl:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Sidebar */}
      <Sidebar
        onLogout={() => {
          if (socketRef.current) {
            socketRef.current.disconnect();
          }
        }}
      />
      <>
        <div className="xl:h-[45%] w-full lg:w-full xl:w-full 2xl:w-full xl:flex gap-5">
          <ThreeScene
            socketData={ModelData}
            ModelTempData={ModelTempData}
            lastButtonClicked={lastButtonClicked}
            latesttimestamp={latesttimestamp}
          />

          {/* <Notifications /> */}
          <Aside socketData={AsideData} />
        </div>

        {/* Bottom Section: Chart and B Side */}
        <div className="xl:h-[45%] w-full lg:w-fit xl:w-full 2xl:w-full xl:flex gap-5">
          <DashboardChart socketData={AvgData} onChartClick={handleChartClick} />
          <Bside socketData={BsideData} />
        </div>
      </>

      {/* Render AlertBox with overlay */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <AlertBox 
            onClose={() => setShowAlert(null)}
            partNames={showAlert}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;