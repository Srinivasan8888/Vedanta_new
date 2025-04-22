import React, { useState, useEffect } from "react";
import adduser from "./img/Vector.svg";
import "../../miscellaneous/Scrollbar.css";
import { Toaster, toast } from "sonner";
import API from "../../Axios/AxiosInterceptor";
import Table from "../../common/Table";
import { useLocation, useNavigate } from "react-router-dom";
// import { Input, IconButton, Typography } from "@material-tailwind/react";

const Alert = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    employeeNo: "",
  });
  const [alertRangeData, setAlertRangeData] = useState({
    info: "",
    warning: "",
    critical: "",
  });
  const [frequencyOptions, setFrequencyOptions] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedRadioFrequency, setSelectedRadioFrequency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reportUsers, setReportUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [frequencyData, setFrequencyData] = useState([]);
  const [alertUsers, setAlertUsers] = useState([]);
  const [isLoadingAlertUsers, setIsLoadingAlertUsers] = useState(false);
  const [isLoadingAlertRange, setIsLoadingAlertRange] = useState(false);

  // Mock data for the table
  // const mockUsers = [
  //   {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     role: "Admin",
  //     status: "Active",
  //   },
  //   {
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     role: "Editor",
  //     status: "Inactive",
  //   },
  //   {
  //     name: "Bob Johnson",
  //     email: "bob.johnson@example.com",
  //     role: "User",
  //     status: "Active",
  //   },
  //   {
  //     name: "Alice Brown",
  //     email: "alice.brown@example.com",
  //     role: "Editor",
  //     status: "Active",
  //   },
  //   {
  //     name: "Charlie Wilson",
  //     email: "charlie.wilson@example.com",
  //     role: "User",
  //     status: "Inactive",
  //   },
  // ];

  // Table headers
  const tableHeaders = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phoneno", label: "Phone Number" },
    { id: "employeeNo", label: "Employee Number" },
    { id: "mode", label: "Mode" },
    { id: "frequency", label: "Frequency" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const response = await API.post(
        `${process.env.REACT_APP_SERVER_URL}api/admin/createAlertUsers`,
        {
          name: formData.name,
          email: formData.email,
          phoneno: formData.phoneno,
          employeeNo: formData.employeeNo,
        },
      );

      console.log("Report created:", response.data);
      toast.success("User has been added successfully");
      setIsModalOpen(false);

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phoneno: "",
        employeeNo: "",
      });

      // Refresh the alert users data
      fetchAlertUsers();
    } catch (error) {
      console.error("Error creating report:", error);
      toast.error("Failed to add user");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number to limit to 10 digits
    if (name === "phoneno") {
      // Convert to string and take only the first 10 digits
      const limitedValue = String(value).slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: limitedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Fetch alert users from API
  const fetchAlertUsers = async () => {
    try {
      setIsLoadingAlertUsers(true);
      const response = await API.get(
        `${process.env.REACT_APP_SERVER_URL}api/admin/getAlertFreqUsers`,
      );

      if (response.data && response.data.data) {
        setAlertUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching alert users:", error);
      toast.error("Failed to fetch alert users");
    } finally {
      setIsLoadingAlertUsers(false);
    }
  };

  const fetchFrequencyData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(
        `${process.env.REACT_APP_SERVER_URL}api/admin/getAlertFrequency`,
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setFrequencyData(response.data.data);

        // Get the most recent entry (last in the array)
        const latestEntry = response.data.data[response.data.data.length - 1];

        // Set the mode and frequency from the API response
        setSelectedRadioFrequency(latestEntry.mode);
        setFrequencyOptions(latestEntry.frequency);

        // Update URL with the values from API
        updateUrlWithOptions(latestEntry.mode, latestEntry.frequency);

        console.log("Loaded frequency data:", latestEntry);
      }
    } catch (error) {
      console.error("Error fetching frequency data:", error);
      toast.error("Failed to load frequency data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Before saving changes");
      console.log("Selected Mode:", selectedRadioFrequency);
      console.log("Selected Frequency:", frequencyOptions);

      if (!selectedRadioFrequency) {
        toast.error("Please select a mode");
        return;
      }

      if (!frequencyOptions) {
        toast.error("Please select a frequency");
        return;
      }

      // Ensure localStorage is only accessed on the client side
      if (typeof window !== "undefined") {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
          toast.error("User email not found. Please log in again.");
          return;
        }

        setIsSaving(true);

        // Create the payload object with correct parameter names
        const payload = {
          frequency: frequencyOptions,
          email: userEmail,
          mode: selectedRadioFrequency,
        };

        console.log("Payload:", payload);

        // Send the frequency and email to the createSetAlertFrequency API
        const frequencyResponse = await API.post(
          `${process.env.REACT_APP_SERVER_URL}api/admin/createSetAlertFrequency`,
          payload,
        );

        // Store the frequency data in localStorage with correct parameter names
        localStorage.setItem(
          "frequencyData",
          JSON.stringify({
            frequency: frequencyOptions,
            mode: selectedRadioFrequency,
            timestamp: new Date().toISOString(),
          }),
        );

        console.log("Frequency set:", frequencyResponse.data);
        toast.success("Alert settings saved successfully");

        // Refresh the user list and frequency data
        fetchAlertUsers();
        fetchFrequencyData();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Failed to save settings: ${error.response.data.message}`);
      } else {
        toast.error("Failed to save settings. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleRadioModeChange = (e) => {
    const newMode = e.target.value;
    setSelectedRadioFrequency(newMode);
    updateUrlWithOptions(newMode, frequencyOptions);
  };

  const handleRadioFrequencyChange = (e) => {
    const newFrequency = e.target.value;
    setFrequencyOptions(newFrequency);
    updateUrlWithOptions(selectedRadioFrequency, newFrequency);
  };

  // Function to update URL with current options
  const updateUrlWithOptions = (mode, frequency) => {
    const params = new URLSearchParams(location.search);

    if (mode) {
      params.set("mode", mode);
    } else {
      params.delete("mode");
    }

    if (frequency) {
      params.set("frequency", frequency);
    } else {
      params.delete("frequency");
    }

    // Update URL without reloading the page
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Function to read options from URL
  const readOptionsFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const modeFromUrl = params.get("mode");
    const frequencyFromUrl = params.get("frequency");

    if (modeFromUrl) {
      setSelectedRadioFrequency(modeFromUrl);
    }

    if (frequencyFromUrl) {
      setFrequencyOptions(frequencyFromUrl);
    }
  };

  // Read options from URL when component mounts or URL changes
  useEffect(() => {
    readOptionsFromUrl();
  }, [location.search]);

  // Fetch data when component mounts
  useEffect(() => {
    fetchAlertUsers();
    fetchFrequencyData();
    fetchAlertRangeData();
  }, []);

  // Refresh alert users when frequency data changes
  useEffect(() => {
    if (frequencyData.length > 0) {
      fetchAlertUsers();
    }
  }, [frequencyData]);

  // Fetch alert range data from API
  const fetchAlertRangeData = async () => {
    try {
      setIsLoadingAlertRange(true);
      const response = await API.get(
        `${process.env.REACT_APP_SERVER_URL}api/admin/getUserAlertRange`
      );

      console.log("Alert range data response:", response.data);

      if (response.data && response.data.data && response.data.data.length > 0) {
        // Get the latest entry (last in the array)
        const latestData = response.data.data[response.data.data.length - 1];
        console.log("Latest alert range data:", latestData);
        
        setAlertRangeData({
          info: latestData.info,
          warning: latestData.warning,
          critical: latestData.critical,
        });
      } else {
        console.log("No alert range data found");
        // Set default values if no data is found
        setAlertRangeData({
          info: "370",
          warning: "450",
          critical: "700",
        });
      }
    } catch (error) {
      console.error("Error fetching alert range data:", error);
      toast.error("Failed to load alert range data");
      
      // Set default values if there's an error
      setAlertRangeData({
        info: "370",
        warning: "450",
        critical: "700",
      });
    } finally {
      setIsLoadingAlertRange(false);
    }
  };

  const handleAlertRangeChange = (type, value) => {
    // If the value is empty, set it to empty string instead of 0
    const newValue = value === "" ? "" : Number(value);
    setAlertRangeData((prev) => ({
      ...prev,
      [type]: newValue,
    }));
  };

  const handleSaveAlertRange = async (e) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Get user email from localStorage
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        toast.error("User email not found. Please log in again.");
        return;
      }
      
      // Include email in the request payload
      const payload = {
        info: alertRangeData.info,
        warning: alertRangeData.warning,
        critical: alertRangeData.critical,
        email: userEmail
      };
      
      console.log("Sending payload:", payload);
      
      // Log the exact URL being used
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}api/admin/SaveUserAlert`;
      console.log("API URL:", apiUrl);
      
      const response = await API.post(apiUrl, payload);

      console.log("Alert range saved:", response.data);
      toast.success("Alert limits have been saved successfully");
      setIsModalOpen2(false);
      
      // Refresh the alert range data after saving
      fetchAlertRangeData();
    } catch (error) {
      console.error("Error saving alert range:", error);
      
      // Log the full error response for debugging
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      
      // Handle specific error messages from the API
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Failed to save alert limits: ${error.response.data.message}`);
      } else {
        toast.error("Failed to save alert limits. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col flex-1 gap-4 px-4 py-4">
        <div className="h-[70%] rounded-2xl border-2 border-white bg-[#101010]/90 backdrop-blur-sm">
          <div className="flex h-[15%] items-center justify-between px-6">
            <div className="flex gap-10">
              <div className="flex items-center justify-center font-['Poppins'] text-2xl font-semibold text-white">
                Select People
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen2(true)}
                className="mt-4 inline-flex h-11 w-32 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-center text-sm text-black backdrop-blur-sm md:mt-0 md:font-medium"
              >
                <span className="justify-start font-['Poppins'] text-lg font-medium text-black">
                  Set Alert
                </span>
              </button>
            </div>
            <div className="flex gap-10 text-white md:text-2xl">
              <div className="text-yellow-600">
                Info: <span className="text-white">{alertRangeData.info}°C</span>
              </div>
              <div className="text-orange-600">
                Warning: <span className="text-white">{alertRangeData.warning}°C</span>
              </div>
              <div className="text-red-600">
                Critical: <span className="text-white">{alertRangeData.critical}°C</span>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                class="inline-flex items-center rounded-full border border-blue-700 p-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
          <div className="h-0 w-full outline outline-1 outline-offset-[-0.50px] outline-[rgba(255,255,255,1)]" />
          <Table
            headers={tableHeaders}
            data={alertUsers.map((user) => {
              // Find the frequency data for this user
              const userFrequencyData = frequencyData.find(
                (f) => f.email === user.email,
              );

              return {
                name: user.name,
                email: user.email,
                phoneno: `+91 ${user.phoneno}`,
                employeeNo: user.employeeNo,
                mode: userFrequencyData ? userFrequencyData.mode : "Not set",
                frequency: userFrequencyData
                  ? userFrequencyData.frequency
                  : "Not set",
              };
            })}
            isLoading={isLoadingAlertUsers}
            actionIcon={actionIcon}
            onActionClick={handleActionClick}
            className="h-[80%]"
          />
        </div>
        <div className="h-[30%] w-full rounded-2xl bg-[#101010]/90 text-white backdrop-blur-sm">
          <div className="flex h-[35.25%] w-full flex-row">
            <div className="mt-4 flex w-[40%] justify-center font-['Poppins'] text-2xl font-semibold text-white">
              Select Mode
            </div>
            <div className="w-full h-full">
              <div className="flex h-[55.5%] flex-col items-center justify-center overflow-hidden px-6 py-4">
                <div className="flex justify-around w-full h-full mt-6 flex-cols-3 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="sms"
                      checked={selectedRadioFrequency === "sms"}
                      onChange={handleRadioModeChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      SMS
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="mail"
                      checked={selectedRadioFrequency === "mail"}
                      onChange={handleRadioModeChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      Mail
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="both"
                      checked={selectedRadioFrequency === "both"}
                      onChange={handleRadioModeChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      Both
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-[35.25%] w-full flex-row">
            <div className="mt-4 flex w-[40%] justify-center font-['Poppins'] text-2xl font-semibold text-white">
              Select Frequency
            </div>
            <div className="w-full h-full">
              {" "}
              <div className="flex h-[55.5%] flex-col items-center justify-center overflow-hidden px-6 py-4">
                <div className="flex items-center justify-around w-full h-full mt-6 flex-cols-3 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      value="10min"
                      checked={frequencyOptions === "10min"}
                      onChange={handleRadioFrequencyChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      10 Mins
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      value="30min"
                      checked={frequencyOptions === "30min"}
                      onChange={handleRadioFrequencyChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      30 Mins
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      value="1hr"
                      checked={frequencyOptions === "1hr"}
                      onChange={handleRadioFrequencyChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                      1 Hr
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={isSaving || !selectedRadioFrequency || !frequencyOptions}
            className="mt-4 inline-flex h-12 w-32 items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-center text-sm text-black backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50 md:mt-0 md:h-16 md:w-56 md:font-medium"
          >
            {isSaving ? (
              <>
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    +91
                  </span>
                  <input
                    type="number"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleInputChange}
                    min="0"
                    max="9999999999"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter 10-digit mobile number"
                    required="true"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee Number
                </label>
                <input
                  type="text"
                  name="employeeNo"
                  value={formData.employeeNo}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
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
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add User"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen2(false)}
          />

          {/* Modal content */}
          <div className="relative z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Set New Alert Limit
              </h3>
              <button
                onClick={() => setIsModalOpen2(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveAlertRange} className="space-y-4">
              <div className="w-full">
                <p className="mb-1 text-sm font-medium text-blue-500">
                  Select Value for Info
                </p>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={alertRangeData.info}
                    onChange={(e) =>
                      handleAlertRangeChange("info", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border px-3 py-2.5 text-sm text-blue-500 placeholder-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                  />
                  <div className="absolute flex gap-1 right-1 top-1">
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "info",
                          Math.max(0, Number(alertRangeData.info || 0) - 1),
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "info",
                          Number(alertRangeData.info || 0) + 1,
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-blue-500">
                  Info: Monitoring Recommended!!!
                </p>
              </div>

              <div className="w-full">
                <p className="mb-1 text-sm font-medium text-blue-500">
                  Select Value for Warning
                </p>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={alertRangeData.warning}
                    onChange={(e) =>
                      handleAlertRangeChange("warning", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border px-3 py-2.5 text-sm text-blue-500 placeholder-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                  />
                  <div className="absolute flex gap-1 right-1 top-1">
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "warning",
                          Math.max(0, Number(alertRangeData.warning || 0) - 1),
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "warning",
                          Number(alertRangeData.warning || 0) + 1,
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-blue-500">
                  Warning: Attention Required!!!
                </p>
              </div>

              <div className="w-full">
                <p className="mb-1 text-sm font-medium text-blue-500">
                  Select Value for Critical
                </p>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={alertRangeData.critical}
                    onChange={(e) =>
                      handleAlertRangeChange("critical", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border px-3 py-2.5 text-sm text-blue-500 placeholder-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                  />
                  <div className="absolute flex gap-1 right-1 top-1">
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "critical",
                          Math.max(0, Number(alertRangeData.critical || 0) - 1),
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1.5 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() =>
                        handleAlertRangeChange(
                          "critical",
                          Number(alertRangeData.critical || 0) + 1,
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-blue-500">
                  Critical: Immediated Action Requried!!!
                </p>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen2(false)}
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
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
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

export default Alert;
