import React from "react";

import bg from "../../Assets/images/bg.png";
import ThreeScene from "../../Assets/model/ThreeScene";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import Notifications from "../../Assets/components/Dashboard/Notifications";
import Aside from "../../Assets/components/Dashboard/Aside";
import Bside from "../../Assets/components/Dashboard/Bside";
import DashboardChart from "../../Assets/components/Dashboard/DashboardChart";

const Dashboard = () => {
  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      <div className="md:h-[45%] md:flex  ">
        {/* <div className="h-[500px]  bg-[rgba(16,16,16,0.9)] md:h-auto md:w-[75%] z-1 rounded-2xl  m-4"> */}
        <>
        {/* <div className="absolute z-10 flex items-center justify-center w-full p-4">
        <div className="flex w-full gap-4">
          <button
            type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <p className="flex items-center justify-center text-2xl font-semibold text-white ">1908</p>
          <button
            type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div> */}
      <ThreeScene />
        </>
          
        
        {/* </div> */}

        <Notifications />
      </div>
      <div className="md:h-[47%] md:flex">
      
        <DashboardChart/>  

        <Aside/>
        
        <Bside/>
      </div>
    </div>
  );
};

export default Dashboard;
