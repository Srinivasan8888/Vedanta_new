import React from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";

const Settings = () => {
  return (
    <div
      className="relative flex flex-col w-screen h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="container flex flex-col justify-center flex-grow px-4 py-8 mx-auto space-y-8">
        {/* Profile Section */}
        <div className="w-full p-6 text-white rounded-lg shadow-lg bg-black/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Profile Image */}
              <div className="w-20 h-20 overflow-hidden border-4 border-white rounded-full">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Profile Details */}
              <div>
                <h2 className="text-xl font-semibold">Welcome Back Nishanth</h2>
                <p className="text-sm">Marketing Manager</p>
                <p className="text-sm">
                  123 Lotus Street, Greenwood Colony, Chennai - 600089, Tamil
                  Nadu, India.
                </p>
              </div>
            </div>
            {/* Edit Button */}
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="w-full p-6 text-white rounded-lg shadow-lg bg-black/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            {/* Edit Button */}
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Edit
            </button>
          </div>
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="font-semibold">First Name</p>
              <p>Nishanth</p>
            </div>
            <div>
              <p className="font-semibold">Last Name</p>
              <p>Raja</p>
            </div>
            <div>
              <p className="font-semibold">Email Address</p>
              <p>nishanth.r@innovateagency.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>+91 98765 43210</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">Bio</p>
              <p>
                I'm Nishanth Raja, a Marketing Manager with over a decade of
                experience in the tech industry. Currently, I lead a fantastic
                team at Innovate Agency, where we create and execute innovative
                marketing strategies that drive brand growth and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
