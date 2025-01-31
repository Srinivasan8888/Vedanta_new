import React from "react";
import "../Miscellaneous/Scrollbar.css";

const CollectorBarTable = ({ data }) => {
  // Dummy data for testing
  const dummyData = {
    timestamps: [
      "2023-10-01T12:00:00Z", 
      "2023-10-01T12:05:00Z", 
      "2023-10-01T12:10:00Z",
      "2023-10-01T12:15:00Z", // New timestamp
       "2023-10-01T12:20:00Z", // New timestamp
       "2023-10-01T12:25:00Z", // Added timestamp
       "2023-10-01T12:30:00Z"  // Added timestamp
    ],
    data: {
      CB1A1: [100, 200, 300, 400, 500, 600, 700], // Added more data points
      Value: [10, 20, 30, 40, 50, 60, 70],         // Added more data points
    },
  };

  // Use dummy data if no data is provided
  const tableData = data || dummyData;

  // Define headers dynamically based on the keys in the data object
  const headers = [
    "CB1A1",
    "TimeStamp",
    "Value",
    // Add more headers as needed based on the data structure
  ];

  // Extract timestamps and data from props, ensuring proper fallbacks to avoid errors
  const timestamps = tableData?.timestamps || [];
  const noDataAvailable = (!timestamps || timestamps.length === 0) || 
                          (tableData.data && Object.keys(tableData.data).length === 0);

  return (
    <div style={{ maxHeight: '600px' }}>
      <table className="w-full text-lg font-normal text-white font-poppins">
        <thead className="sticky top-0 bg-[rgb(16,16,16)] z-10">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 border border-white ${
                  index % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {noDataAvailable ? (
            <tr className="border-b border-white bg-[rgb(16,16,16)]">
              <td
                colSpan={headers.length}
                className="px-6 py-4 text-center font-medium text-white border border-white bg-[rgb(16,16,16)]"
              >
                No data available
              </td>
            </tr>
          ) : (
            timestamps.map((timestamp, rowIndex) => {
              // Extract row data based on the headers
              const rowData = [
                tableData.data["CB1A1"]?.[rowIndex],
                timestamp,
                tableData.data["Value"]?.[rowIndex],
              ];

              // Skip rendering the row if there is no data for any column
              if (rowData.every((cell) => !cell)) {
                return null;
              }

              return (
                <tr key={rowIndex} className="border-b border-white bg-[rgb(16,16,16)]">
                  {rowData.map((cellData, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 border border-white  ${
                        colIndex % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"
                      }`}
                    >
                      <span className={`text-white`}>
                        {cellData || ""} {/* Display cell data or an empty string */}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollectorBarTable;
