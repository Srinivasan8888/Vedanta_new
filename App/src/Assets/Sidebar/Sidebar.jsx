import React, { useState , useEffect, useRef} from "react";
import { io } from "socket.io-client";
import logo from "../../Assets/images/Vedanta-Logo.png";
import xyma_logo from "../../Assets/images/Xyma-Logo.png";
import Arrow from "../../Assets/images/down-arrow.png";
import { Menus } from "./Menu";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css"

const SearchInput = ({ iddropdown, searchText, handleSearchChange, filteredData, handleSuggestionClick, showSuggestions, setShowSuggestions }) => {
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
    <div className="hidden md:flex md:w-[25%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px] items-center justify-center backdrop-blur-sm z-30" ref={containerRef}>
      <div className="relative flex items-center w-full">
        <input
          id="search"
          name="search"
          type="number"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search"
          className="w-full h-full bg-transparent text-white font-poppins text-[22px] font-semibold leading-[33px] placeholder:text-gray-400 focus:outline-none rounded-xl py-1.5 pl-7 pr-20"
          onFocus={() => setShowSuggestions(true)}
        />
        
        {showSuggestions && searchText && (
          <ul className="absolute left-0 right-0 z-40 overflow-y-auto text-black bg-white border border-gray-300 shadow-lg top-full max-h-40 rounded-xl">
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

const Sidebar = () => {
  const navigate = useNavigate();
  const [iddropdown, setIddropdown] = useState([]); // Make sure this is an array
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchText, setSearchText] = useState(localStorage.getItem('searchText') || "");
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
      const refreshToken = localStorage.getItem('refreshToken');
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}auth/logout`, {
        data: { refreshToken },
        withCredentials: true
      });
      
      // Clear all client-side storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Force reload to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // Ensure cleanup even if server request fails
      localStorage.clear();
      window.location.href = "/";
    }
  };
  
  useEffect(() => {
    const fetchUniqueIds = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}api/v2/getuniqueids`);
        const ids = response.data.ids;
        setIddropdown(ids);
        setFilteredData(ids);
        localStorage.setItem('cachedIds', JSON.stringify(ids));
      } catch (error) {
        console.error("Error fetching unique IDs:", error);
        setError("Failed to fetch device IDs");
        // Fallback to localStorage if available
        const cachedIds = JSON.parse(localStorage.getItem('cachedIds') || '[]');
        setIddropdown(cachedIds);
        setFilteredData(cachedIds);
      }
    };

    // Load initial data from localStorage if available
    const cachedIds = JSON.parse(localStorage.getItem('cachedIds') || '[]');
    if (cachedIds.length > 0) {
      setIddropdown(cachedIds);
      setFilteredData(cachedIds);
    }
    
    fetchUniqueIds();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
    localStorage.setItem('searchText', query);

    // Ensure the input is numeric
    if (/^\d*$/.test(query)) {
      const filtered = iddropdown.filter((item) =>
        item.toString().includes(query) // Numeric filter
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchText(item);
    localStorage.setItem('searchText', item);
    setShowSuggestions(false);
  };

  return (
    <>
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
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoDashboard()}
        >
          Home
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoReport()}
        >
          Report
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
          onClick={() => gotoAnalytics()}
        >
          Analytics
        </button>
        <button
          className="hidden md:flex md:w-[14%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
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
        />

        <button
          className="hidden md:flex md:w-[4%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px]  items-center justify-center backdrop-blur-sm"
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
        <div className="hidden md:flex md:w-[8%] rounded-xl border border-white bg-[rgba(14,14,14,0.75)] text-white font-poppins text-[22px] font-semibold leading-[33px] items-center justify-center backdrop-blur-sm">
          <img
            src={xyma_logo}
            alt="xyma logo"
            className="w-16 h-auto xl:max-w-[100px] max-h-[40px] xl:w-28"
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
