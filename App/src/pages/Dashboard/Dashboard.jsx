import React, { useEffect, useState } from "react";
import bg from "../../Assets/images/bg.png";
import ThreeScene from "../../Assets/model/ThreeModel.jsx";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import Notifications from "../../Assets/components/Dashboard/Notifications";
import Aside from "../../Assets/components/Dashboard/Aside";
import Bside from "../../Assets/components/Dashboard/Bside";
import DashboardChart from "../../Assets/components/Dashboard/DashboardChart";
import io from "socket.io-client";

// const socket = io(process.env.REACT_APP_WEBSOCKET_URL);
const socket = io("http://15.207.173.73:5001");

const Dashboard = () => {
  const [AsideData, setAsidedata] = useState([]);
  const [BsideData, setBsidedata] = useState([]);
  const [ModelData, setModelData] = useState([]);

  useEffect(() => {
    // Connect socket if not already connected
    if (!socket.connected) {
      socket.connect();
    }


    // Setup event listeners
    socket.on("ASide", (data) => {
      setAsidedata(data);
    });

    // Listen for updates from SensorModel2
    socket.on("BSide", (data) => {
      setBsidedata(data);
      // console.log("Received Bside Data:", data);
    });

    socket.on("AllData", (data) => {
      if (Array.isArray(data)) {
        setModelData(data);
        console.log("Received All Model Data:", data);
      }
    });

    return () => {
      socket.off("ASide");
      socket.off("BSide");
      socket.off("AllData");
      socket.disconnect();
    };
  }, []);
  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      <div className="md:h-[45%] md:flex  ">
        <ThreeScene socketData={ModelData}/>

        <Notifications />
      </div>
      <div className="md:h-[47%] md:flex">
        <DashboardChart />

        <Aside socketData={AsideData} />

        <Bside socketData={BsideData} />
      </div>
    </div>
  );
};

export default Dashboard;
