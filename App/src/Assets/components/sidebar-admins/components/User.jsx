import React, { useState, useEffect } from "react";
import adduser from "./img/Vector.svg";
import "../../miscellaneous/Scrollbar.css";
import Switcher from "./comp/switcher";
import Table from "../../common/Table";
import axios from "axios";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneno: '',
    employeeNo: ''
  });
  const [activeTable, setActiveTable] = useState("UserP");
  const [tableAData, setTableAData] = useState([]);
  const [tableBData, setTableBData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState(""); 
  const [phoneno, setPhoneno] = useState(""); 
  const [empid, setEmpid] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    if (confirmpassword === password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}auth/register`,
          {
            email,
            password,
            role,
          },
        );

        if (response.data.email) {
          alert("user created successfully");
          window.location.href = `${process.env.REACT_APP_URL}`;
        } else {
          alert("Unknown error has occurred");
        }
      } catch (error) {
        setErrorMessage(
          `Failed to register: ${error.response?.data?.error?.message || error.message}`,
        );
      }
    } else {
      alert("Password is not matching");
    }
  };
  
  // Mock data for Table A - Employee Information
  const mockTableAData = [
    { sno: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", Employee: "EMP001", phone: "+1 234-567-8901" },
    { sno: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", Employee: "EMP002", phone: "+1 234-567-8902" },
    { sno: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", Employee: "EMP003", phone: "+1 234-567-8903" },
    { sno: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", Employee: "EMP004", phone: "+1 234-567-8904" },
    { sno: 5, name: "Charlie Wilson", email: "charlie.wilson@example.com", role: "User", Employee: "EMP005", phone: "+1 234-567-8905" },
    { sno: 6, name: "Diana Miller", email: "diana.miller@example.com", role: "Admin", Employee: "EMP006", phone: "+1 234-567-8906" },
    { sno: 7, name: "Edward Davis", email: "edward.davis@example.com", role: "User", Employee: "EMP007", phone: "+1 234-567-8907" },
    { sno: 8, name: "Fiona Clark", email: "fiona.clark@example.com", role: "Editor", Employee: "EMP008", phone: "+1 234-567-8908" },
  ];

  // Mock data for Table B - User Activity Log
  const mockTableBData = [
    { sno: 1, user: "john.doe@example.com", method: "Login", city: "New York", country: "USA", ip: "192.168.1.1", latitute: "40.7128", longitute: "-74.0060", service: "Web", region: "North America", Time: "2023-06-15 09:30:45" },
    { sno: 2, user: "jane.smith@example.com", method: "Logout", city: "London", country: "UK", ip: "192.168.1.2", latitute: "51.5074", longitute: "-0.1278", service: "Mobile", region: "Europe", Time: "2023-06-15 10:15:22" },
    { sno: 3, user: "bob.johnson@example.com", method: "Login", city: "Tokyo", country: "Japan", ip: "192.168.1.3", latitute: "35.6762", longitute: "139.6503", service: "Web", region: "Asia", Time: "2023-06-15 11:45:10" },
    { sno: 4, user: "alice.brown@example.com", method: "Update Profile", city: "Sydney", country: "Australia", ip: "192.168.1.4", latitute: "-33.8688", longitute: "151.2093", service: "Web", region: "Oceania", Time: "2023-06-15 12:30:15" },
    { sno: 5, user: "charlie.wilson@example.com", method: "Login", city: "Toronto", country: "Canada", ip: "192.168.1.5", latitute: "43.6532", longitute: "-79.3832", service: "Mobile", region: "North America", Time: "2023-06-15 14:20:30" },
    { sno: 6, user: "diana.miller@example.com", method: "Logout", city: "Berlin", country: "Germany", ip: "192.168.1.6", latitute: "52.5200", longitute: "13.4050", service: "Web", region: "Europe", Time: "2023-06-15 16:10:45" },
    { sno: 7, user: "edward.davis@example.com", method: "Login", city: "Mumbai", country: "India", ip: "192.168.1.7", latitute: "19.0760", longitute: "72.8777", service: "Mobile", region: "Asia", Time: "2023-06-15 18:05:20" },
    { sno: 8, user: "fiona.clark@example.com", method: "Update Settings", city: "São Paulo", country: "Brazil", ip: "192.168.1.8", latitute: "-23.5505", longitute: "-46.6333", service: "Web", region: "South America", Time: "2023-06-15 20:15:40" },
  ];

  // Function to fetch data from API - to be implemented in the future
  const fetchData = async (tableType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is where you would make your API call
      // Example:
      // const response = await fetch(`/api/users/${tableType}`);
      // const data = await response.json();
      
      // For now, using mock data
      const data = tableType === "UserP" ? mockTableAData : mockTableBData;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (tableType === "UserP") {
        setTableAData(data);
      } else {
        setTableBData(data);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData("UserP");
    fetchData("UserL");
  }, []);

  const handleSwitch = (value) => {
    setActiveTable(value);
  };

  // Table A column headers
  const tableAHeaders = [
    { id: "sno", label: "S.No" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "Employee", label: "Employee ID" },
    { id: "phone", label: "phone no" }
  ];

  // Table B column headers
  const tableBHeaders = [
    { id: "sno", label: "S.No" },
    { id: "user", label: "User" },
    { id: "method", label: "Method" },
    { id: "city", label: "City" },
    { id: "country", label: "Country" },
    { id: "ip", label: "IP" },
    { id: "latitute", label: "Latitute" },
    { id: "longitute", label: "Longitute" },
    { id: "service", label: "Service" },
    { id: "region", label: "Region" },
    { id: "Time", label: "time" }
  ];

  // Action icon for the table
  const actionIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  // Handle action button click
  const handleActionClick = (row) => {
    console.log("Action clicked for row:", row);
    // Implement your action logic here
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-start justify-start gap-5 p-4">
          <Switcher onSwitch={handleSwitch} />
          <button className="flex h-16 w-44 items-center justify-center gap-2 rounded-lg bg-[#101010]/90 outline outline-1 outline-offset-[-0.50px] outline-white backdrop-blur-sm">
            <div className="font-['Poppins'] text-lg font-medium text-white">
              Sort By
            </div>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="bx:sort">
                <path
                  id="Vector"
                  d="M8 16.5H4L10 22.5V2.5H8V16.5ZM14 5.5V22.5H16V8.5H20L14 2.5V5.5Z"
                  fill="white"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center p-4 md:items-end md:justify-end">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            class="mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 md:h-16 md:w-44 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
          >
            <img src={adduser} alt="adduser" className="w-5 h-5 -ms-1 me-2" />
            Add User
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4 px-4 py-4 rounded-2xl">
        <div className="h-[100%] rounded-2xl border-2 border-white bg-[#101010]/90 backdrop-blur-sm">
          <Table 
            headers={activeTable === "UserP" ? tableAHeaders : tableBHeaders}
            data={activeTable === "UserP" ? tableAData : tableBData}
            isLoading={isLoading}
            error={error}
            actionIcon={actionIcon}
            onActionClick={handleActionClick}
            headerClassName="bg-[rgba(59,59,59)]"
            className="h-[80%]"
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal content */}
          <div className="relative z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New User
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
            <form  className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required="true"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                  required="true"
                />
              </div>
              <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required="true"
                  />
                </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
                </label>
                <input
                  type="number"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required="true"
                />
              </div>

              <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Role
                  </label>

                  <select 
                    required 
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }} 
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super-Admin</option>
                  </select>
                </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeNo"
                  value={formData.employeeNo}
                  onChange={(e) => setEmpid(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                 required="true"
                />
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSaving ? (
                    <>
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    'Add User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
