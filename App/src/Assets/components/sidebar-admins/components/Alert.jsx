import React, { useState, useEffect } from 'react';
import adduser from "./img/Vector.svg";
import "../../miscellaneous/Scrollbar.css";
import { Toaster, toast } from 'sonner'
import API from '../../Axios/AxiosInterceptor';
import Table from '../../common/Table';

const Alert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneno: '',
    employeeNo: ''
  });
  const [frequencyOptions, setFrequencyOptions] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedRadioFrequency, setSelectedRadioFrequency] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reportUsers, setReportUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [frequencyData, setFrequencyData] = useState([]);

  // Mock data for the table
  const mockUsers = [
    { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Inactive" },
    { name: "Bob Johnson", email: "bob.johnson@example.com", role: "User", status: "Active" },
    { name: "Alice Brown", email: "alice.brown@example.com", role: "Editor", status: "Active" },
    { name: "Charlie Wilson", email: "charlie.wilson@example.com", role: "User", status: "Inactive" },
  ];

  // Table headers
  const tableHeaders = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" }
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
        `${process.env.REACT_APP_SERVER_URL}api/admin/createReport`,
        {
          name: formData.name,
          email: formData.email,
          phoneno: FormData.phoneno,
          employeeNo: formData.employeeNo
        }
      );
      
      console.log('Report created:', response.data);
      toast.success('User has been added successfully');
      setIsModalOpen(false);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phoneno: '',
        employeeNo: ''
      });
      
      // Refresh the user list
      // fetchReportUsers();
    } catch (error) {
      console.error("Error creating report:", error);
      toast.error("Failed to add user");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col flex-1 gap-4 px-4 py-4">
        <div className="h-[70%] rounded-2xl border-2 border-white bg-[#101010]/90 backdrop-blur-sm">
          <div className="flex h-[15%] items-center justify-between px-6">
            <div className="justify-start font-['Poppins'] text-2xl font-semibold text-white">
              Select People
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
            data={mockUsers}
            isLoading={isLoadingUsers}
            actionIcon={actionIcon}
            onActionClick={handleActionClick}
            className="h-[80%]"
          />
        </div>
        <div className="h-[30%] w-full rounded-2xl bg-[#101010]/90 text-white backdrop-blur-sm">
          <div className="flex h-[35.25%] w-full flex-row">
            <div className="mt-4 w-[40%] justify-center flex font-['Poppins'] text-2xl font-semibold text-white">
              Select Mode
            </div>
            <div className="w-full h-full">
              {" "}
              <div className="flex h-[55.5%] flex-col items-center justify-center overflow-hidden px-6 py-4">
                <div className="flex justify-around w-full h-full mt-6 flex-cols-3 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="sms"
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
          <div className="mt-4 w-[40%] justify-center flex font-['Poppins'] text-2xl font-semibold text-white">
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
          <div>
            <button
              type="button"
              className="mt-4 inline-flex h-12 w-32 items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-center text-sm text-black backdrop-blur-sm md:mt-0 md:h-20 md:w-56 md:font-medium"
            >
              Save Changes
            </button>
          </div>
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
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
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
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
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
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

export default Alert;

