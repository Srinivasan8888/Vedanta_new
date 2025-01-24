import React, { useState } from "react";
import bg from "../../Assets/images/bg.png";
import Sidebar from "../../Assets/Sidebar/Sidebar";
import AnalyticsButton from "../../Assets/components/Analytics/AnalyticsButton";
import AverageDateRange from "../../Assets/components/Analytics/AverageDateRange";
import TimeInterval from "../../Assets/components/Analytics/TimeInterval";
import RangeDate from "../../Assets/components/Analytics/RangeDate";
import CountData from "../../Assets/components/Analytics/CountData";
// import AnalyticsTable from "../../Assets/components/Analytics/AnalyticsTable";
import AnalyticsChart from "../../Assets/components/Analytics/AnalyticsChart";

const Analytics = () => {
  const [selectedButton, setSelectedButton] = useState("Average");
  const [selectedBusBar, setSelectedBusBar] = useState(1); // Default selected BusBar is 1
  const [fetchedData, setFetchedData] = useState(null); // New state for fetched data

  // Example function to handle BusBar clicks
  const handleBusBarClick = (busBarNumber) => {
    setSelectedBusBar(busBarNumber); // Update the selected BusBar
    console.log(`BusBar${busBarNumber} clicked`);
    // Add your logic here
  };

  // console.log("Fetched Data:", fetchedData); // Log the fetched data

  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />
      <div className="bg-[rgba(16,16,16,0.5)] md:h-[87%] m-4 rounded-lg border border-white">
        <div className="md:h-[35%] md:flex m-4 gap-3">
          <AnalyticsButton
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <div className="md:w-[35%] bg-[rgba(16,16,16,0.7)] md:h-[100%] rounded-xl mt-4 border flex flex-col border-white text-white backdrop-blur justify-center items-center py-4">
            {selectedButton === "Average" && (
              <AverageDateRange
                selectedBusBar={selectedBusBar}
                setFetchedData={setFetchedData} // Pass function to update fetched data
              />
            )}
            {selectedButton === "Time" && (
              <TimeInterval
                selectedBusBar={selectedBusBar}
                setFetchedData={setFetchedData}
              />
            )}
            {selectedButton === "Range" && (
              <RangeDate
                selectedBusBar={selectedBusBar}
                setFetchedData={setFetchedData}
              />
            )}
            {selectedButton === "Count" && (
              <CountData
                selectedBusBar={selectedBusBar}
                setFetchedData={setFetchedData}
              />
            )}
          </div>

          <div className="md:w-[40%] md:h-[100%] rounded-xl mt-4 border border-white overflow-x-auto overflow-y-auto backdrop-blur scrollbar-custom md:flex md:flex-row text-white p-4">
            <div className="md:w-[60%] md:h-[100%] rounded-xl bg-[rgba(16,16,16,0.7)]">
              <div className="text-white text-[22px] font-semibold font-['Poppins'] md:h-[25%] items-center justify-center flex">
                Side A
              </div>
              <div className="flex justify-center">
                <div className="grid items-center justify-center grid-cols-3 gap-5 pl-1">
                  {[1, 2, 3, 4, 5, 6].map((busBarNumber) => (
                    <button
                      key={busBarNumber}
                      className={`w-32 h-20 rounded-lg border flex items-center justify-center bg-[rgba(16,16,16,0.9)] focus:ring-2 focus:ring-white focus:outline-none ${
                        selectedBusBar === busBarNumber
                          ? "border-4 border-white" // Increase border size for selected BusBar
                          : "border border-white" // Default border size
                      }`}
                      onClick={() => handleBusBarClick(busBarNumber)}
                    >
                      <span className="text-white text-base font-medium font-['Poppins']">
                        BusBar {busBarNumber}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-[40%] md:h-[100%] rounded-xl bg-[rgba(16,16,16,0.7)] ml-4">
              <div className="text-white text-[22px] font-semibold font-['Poppins'] md:h-[25%] items-center justify-center flex">
                Side B
              </div>
              <div className="flex justify-center">
                <div className="grid justify-around grid-cols-2 gap-5 ml-3">
                  {[7, 8, 9, 10].map((busBarNumber) => (
                    <button
                      key={busBarNumber}
                      className={`w-32 h-20 rounded-lg border flex items-center justify-center bg-[rgba(16,16,16,0.9)] focus:ring-2 focus:ring-white focus:outline-none ${
                        selectedBusBar === busBarNumber
                          ? "border-4 border-white" // Increase border size for selected BusBar
                          : "border border-white" // Default border size
                      }`}
                      onClick={() => handleBusBarClick(busBarNumber)}
                    >
                      <span className="text-white text-base font-medium font-['Poppins']">
                        BusBar {busBarNumber}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:h-[58%] md:flex">
          <div className="md:w-full md:h-full m-4 h-[700px] bg-[rgba(16,16,16,0.6)] rounded-xl border border-white backdrop-blur">
            <AnalyticsChart data={fetchedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
