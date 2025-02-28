import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import logo from "../../Assets/images/Vedanta-Logo.png";
import xyma_logo from "../../Assets/images/Xyma-Logo.png";
import Arrow from "../../Assets/images/down-arrow.png";
import { Menus } from "./Menu";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import API from "../components/Axios/AxiosInterceptor";

const SearchInput = ({
  iddropdown,
  searchText,
  handleSearchChange,
  filteredData,
  handleSuggestionClick,
  showSuggestions,
  setShowSuggestions,
  refreshUniqueIds,
}) => {
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="flex md:w-[30%] lg:w-[25%] xl:w-[22%] 2xl:w-[20%] rounded-xl border border-white 
               bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[14px] lg:text-[16px] xl:text-[18px] 
               2xl:text-[22px] font-medium items-center justify-center backdrop-blur-sm z-30"
      ref={containerRef}
    >
      <div className="relative flex items-center w-full">
        <input
          id="search"
          name="search"
          type="number"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search"
          className="w-full h-full bg-transparent text-white placeholder:md:text-[10px] 
                   lg:placeholder:text-[12px] xl:placeholder:text-[14px] focus:outline-none 
                   rounded-xl py-1.5 pl-5 pr-16 md:pl-4 md:pr-12 lg:pl-5 lg:pr-14 xl:pl-6 xl:pr-16"
          onFocus={() => {
            refreshUniqueIds();
            setShowSuggestions(true);
          }}
        />

        {showSuggestions && searchText && (
          <ul
            className="absolute left-0 right-0 z-50 overflow-y-auto text-black bg-white border 
                        border-gray-300 shadow-lg top-full max-h-[30vh] rounded-xl text-[14px] 
                        lg:text-[16px] xl:text-[18px]"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    handleSuggestionClick(item);
                    setShowSuggestions(false);
                  }}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [iddropdown, setIddropdown] = useState([]); // Make sure this is an array
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("id") || ""
  );
  const [filteredData, setFilteredData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null); // Store error messages

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const goTo = (path) => {
    navigate(path);
  };

  const gotoDashboard = () => goTo("/Dashboard");
  const gotoAnalytics = () => goTo("/Analytics");
  const gotoReport = () => goTo("/Report");
  const gotoSettings = () => goTo("/Settings");
  const gotoHeatmap = () => goTo("/Heatmap");

  const handleLogout = async () => {
    try {
      // Call the onLogout prop to disconnect sockets
      if (props.onLogout) {
        props.onLogout();
      }

      const refreshToken = localStorage.getItem("refreshToken");
      // const accessToken = localStorage.getItem('accessToken');

      // Make logout request first
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}auth/logout`,
        {
          data: { refreshToken },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear storage only after successful response
      if (response.status === 200) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace(`/`);
      }
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      sessionStorage.clear();
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.replace(`/`);
    }
  };

  const refreshUniqueIds = async () => {
    try {
      const response = await API.get(
        `${process.env.REACT_APP_SERVER_URL}api/v2/getuniqueids`
      );
      const ids = response.data.ids;
      setIddropdown(ids);
      setFilteredData(ids);
      localStorage.setItem("cachedIds", JSON.stringify(ids));

      if (ids.length > 0 && !localStorage.getItem("id")) {
        localStorage.setItem("id", ids[0]);
        setSearchText(ids[0]);
      }
    } catch (error) {
      console.error("Error fetching unique IDs:", error);
      setError("Failed to fetch device IDs");
      const cachedIds = JSON.parse(localStorage.getItem("cachedIds") || "[]");
      setIddropdown(cachedIds);
      setFilteredData(cachedIds);
    }
  };

  useEffect(() => {
    const cachedIds = JSON.parse(localStorage.getItem("cachedIds") || "[]");
    if (cachedIds.length > 0) {
      setIddropdown(cachedIds);
      setFilteredData(cachedIds);
    }
    refreshUniqueIds();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
    localStorage.setItem("id", query);

    // Ensure the input is numeric
    if (/^\d*$/.test(query)) {
      const filtered = iddropdown.filter(
        (item) => item.toString().includes(query) // Numeric filter
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchText(item);
    localStorage.setItem("id", item);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* <div className="h-[80px] md:flex md:h-[6.4%] md:w-auto pt-2 mb-2 md:mb-2 md:pt-4 md:justify-between mx-2 gap-3"> */}

      <div className="h-[70px] md:h-[75px] md:flex lg:h-[7.2%] xl:h-[9%] 2xl:h-[7.5%] w-auto md:w-[97%] pt-2 mb-2 md:mb-2 md:pt-4 md:justify-between mx-2 gap-3 xl:w-[97.5%] custom-1.5xl:w-[97.5%] 2xl:w-auto">
        {/* mobileview */}
        <div className="flex items-center w-full h-full text-lg font-semibold text-white bg-black bg-opacity-75 border border-white rounded-xl md:hidden font-popins">
          <div className="flex items-start w-3/4 p-4">
            <img
              src={xyma_logo}
              alt="Xyma Logo"
              className="w-32 h-auto xl:w-26"
            />
          </div>
          
          <div className="flex-1 mx-2">
            <div className="rounded-xl border border-white bg-[rgba(14,14,14,0.75)] backdrop-blur-sm z-30">
              <div className="relative flex items-center w-full">
                <input
                  id="search"
                  name="search"
                  type="number"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="w-full h-full bg-transparent text-white placeholder:text-[10px] focus:outline-none 
                           rounded-xl py-1.5 pl-3 pr-10 text-[14px]"
                  onFocus={() => {
                    refreshUniqueIds();
                    setShowSuggestions(true);
                  }}
                />
                {showSuggestions && searchText && (
                  <ul className="absolute left-0 right-0 z-50 overflow-y-auto text-black bg-white border 
                              border-gray-300 shadow-lg top-full max-h-[30vh] rounded-xl text-[14px]">
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            handleSuggestionClick(item);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No results found</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end w-[16%] p-4">
            <Menus />
          </div>
        </div>

        {/* for desktop */}
        <div className="hidden md:flex md:w-[16%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[12px] xl:text-[16px] xl:font-medium 2xl:text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm">
          <img
            src={logo}
            alt="Vedanta Logo"
            className="md:w-[120px] lg:w-[140px] 2xl:w-[180px]"
          />
        </div>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[12px] xl:text-[16px] xl:font-medium 2xl:text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoDashboard()}
        >
          Home
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[12px] xl:text-[16px] xl:font-medium 2xl:text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoReport()}
        >
          Report
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[12px] xl:text-[16px] xl:font-medium 2xl:text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoAnalytics()}
        >
          Analytics
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins md:text-[12px] xl:text-[16px] xl:font-medium 2xl:text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoHeatmap()}
        >
          Heatmap
        </button>

        <SearchInput
          iddropdown={iddropdown}
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          filteredData={filteredData}
          handleSuggestionClick={handleSuggestionClick}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          refreshUniqueIds={refreshUniqueIds}
        />

        <button
          className="hidden md:flex md:w-[4%]  rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoSettings()}
        >
          <IoMdSettings />
        </button>
        <button
          className="hidden md:flex md:w-[4%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px] items-center justify-center backdrop-blur-sm"
          onClick={toggleSidebar}
          onMouseEnter={() => setIsSidebarOpen(true)}
        >
          <IoNotifications />
        </button>
        <button
          className="hidden md:flex md:w-[4%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => handleLogout()}
        >
          <IoMdLogOut />
        </button>
        <div className="hidden md:flex md:w-[10%] xl:w-[8%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px] items-center justify-center backdrop-blur-sm">
          <img
            src={xyma_logo}
            alt="xyma logo"
            className="w-16 h-auto xl:max-w-[60px] 2xl:max-w-[70px] max-h-[30px] xl-fit"
            //  className="lg:w-[50px] 2xl:w-[180px] lg:h-[70px]"
          />
        </div>
      </div>

      {/* Sidebar Overlay */}
      {/* {isSidebarOpen && (
        <div 
          className={`fixed top-20 right-2.5 flex flex-col h-5/6 text-white duration-1000  bg-[#101010] shadow-lg w-1/4 border-2 border-white rounded-2xl`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <div className="relative flex items-center justify-center p-4 ">
            <p className="flex-1 text-2xl font-semibold text-center">Alerts</p>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Sidebar;
