import React from "react";
import bg from "../../Assets/images/bg.png";
import Adminsidebar from "../../Assets/components/sidebar-admins/adminsidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Generatereport from "../../Assets/components/sidebar-admins/components/Generatereport";
import Alert from "../../Assets/components/sidebar-admins/components/Alert";
import ColorRange from "../../Assets/components/sidebar-admins/components/ColorRange";
import User from "../../Assets/components/sidebar-admins/components/User";
import Alertslogs from "../../Assets/components/sidebar-admins/components/Alertslogs";

const Settings = () => {
  const location = useLocation();

  return (
    <div
      className="relative flex flex-col w-screen h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-row w-full h-full">
        <div className="w-auto h-full">
          <Adminsidebar />
        </div>
       
        <div className="w-full h-full bg-red-500">
        
        </div>
      </div>
    </div>
  );
};

export default Settings;

