import React from "react";

import bg from "../../Assets/images/bg.png";
// import ThreeScene from "../../Assets/components/Models/ThreeScene";
import ThreeScene from "../../Assets/model/ThreeModel.jsx"
import Sidebar from "../../Assets/Sidebar/Sidebar";
import Notifications from "../../Assets/components/Dashboard/Notifications";
import Aside from "../../Assets/components/Dashboard/Aside";
import Bside from "../../Assets/components/Dashboard/Bside";
import DashboardChart from "../../Assets/components/Dashboard/DashboardChart";
import Dashboardmodel from "../../Assets/components/Dashboard/Dashboardmodel";

const Dashboard = () => {
  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      <div className="md:h-[45%] md:flex  ">
        <>
          <ThreeScene />/
        </>

        {/* <Dashboardmodel /> */}

        <Notifications />
      </div>
      <div className="md:h-[47%] md:flex">
        <DashboardChart />

        <Aside />

        <Bside />
      </div>
    </div>
  );
};

export default Dashboard;
