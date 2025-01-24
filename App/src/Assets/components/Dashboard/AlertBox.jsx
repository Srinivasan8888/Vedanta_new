import React from "react";

const AlertBox = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative p-6 text-white bg-black border border-gray-700 rounded-md shadow-lg w-96">
        <button
          className="absolute text-gray-500 transition top-3 right-3 hover:text-white"
          onClick={() => console.log("Close Alert")}
        >
          &times;
        </button>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="p-2 text-black bg-yellow-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.578-1.14.832-1.828l-6.928-7.2a1 1 0 00-1.488 0l-6.928 7.2c-.746.688-.222 1.828.832 1.828z"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm">
            The Temperature of CBT within the potline 1 has reached or exceeded
            the specified limit. Immediate action is required to prevent
            potential damage or safety hazards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
