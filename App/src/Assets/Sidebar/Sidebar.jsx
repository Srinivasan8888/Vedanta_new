import React, {useState} from 'react'
import logo from "../../Assets/images/Vedanta-Logo.png";
import xyma_logo from "../../Assets/images/Xyma-Logo.png";
import Arrow from "../../Assets/images/down-arrow.png";
import { Menus } from "../components/Dashboard/Menu";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const [SelectedSidebar, setSelectedSidebar] = useState(0);
  const goTo = (path) => {
    navigate(path);
  };

  const gotoDashboard = () => goTo("/Dashboard");
  const gotoAnalytics = () => goTo("/Analytics");
  const gotoReport = () => goTo("/Report");
  const gotoSettings = () => goTo("/Settings");

  const handleLogout = async () => {
    // const refreshToken = localStorage.getItem('refreshToken');
    // await axios.post(`${process.env.REACT_APP_SERVER_URL}auth/logout`, { refreshToken });
    localStorage.clear();
    window.location.href = '/';
};

console.log("Server URL:", process.env.REACT_APP_SERVER_URL);

  return (
    <div className="h-[80px] md:flex md:h-[6.4%] md:w-auto pt-2 mb-2 md:mb-2 md:pt-4 md:justify-between mx-2 gap-3">
      
      {/* mobileview */}
      <div className="flex items-center w-full h-full text-lg font-semibold text-white bg-black bg-opacity-75 border border-white rounded-xl md:hidden font-poppins">
        <div className="flex items-start w-3/4 p-4">
          <img src={xyma_logo} alt="Xyma Logo" className="w-32 h-auto" />
        </div>
        <div className="flex items-end w-[16%] p-4">
          <Menus />
        </div>
      </div>

      <div className="hidden md:flex md:w-[16%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm">
        <img
          src={logo}
          alt="Vedanta Logo"
          className="w-full h-auto max-w-[220px] max-h-[45px]"
        />
      </div>
      <button className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm" onClick={() => gotoDashboard()}>
        Home
      </button>
      <button className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm" onClick={() => gotoReport()}>
        Report
      </button> 
      <button className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm" onClick={() => gotoAnalytics()}>
        Analytics
      </button>
      {/* <button className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center">
        Settings
      </button> */}

      <div className="hidden md:flex md:w-[25%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm">
        <input
          id="price"
          name="price"
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent text-white font-poppins text-[22px] font-semibold leading-[33px] placeholder:text-gray-400 focus:outline-none rounded-xl py-1.5 pl-7 pr-20"
        />
        <div className="relative flex items-center">
          <label htmlFor="currency" className="sr-only">
            Options
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full py-0 pl-2 text-gray-500 bg-transparent border-0 rounded-md appearance-none pr-7 focus:outline-none sm:text-sm"
            style={{
              width: "12px",
              height: "19px",
              backgroundImage: `url(${Arrow})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "25px",
            }}
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>

      <button className="hidden md:flex md:w-[4%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm" onClick={() => gotoSettings()}>
        <IoMdSettings />
      </button>
      <button className="hidden md:flex md:w-[4%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm" onClick={() => handleLogout()}>
        <IoMdLogOut />
      </button>
      <div className="hidden md:flex md:w-[8%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px] items-center justify-center backdrop-blur-sm">
        <img
          src={xyma_logo}
          alt="xyma logo"
          className="w-16 h-auto xl:max-w-[100px] max-h-[40px] xl:w-28"
        />
      </div>
    </div>
  )
}

export default Sidebar