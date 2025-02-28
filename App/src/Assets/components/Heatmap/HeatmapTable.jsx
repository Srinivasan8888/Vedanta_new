import React, { useEffect } from "react";
import '../miscellaneous/Scrollbar.css'

const HeatmapTable = ({ data }) => {
  // Extract timestamps and data from props, ensuring proper fallbacks to avoid errors
  const timestamps = data?.timestamps || [];
  const tableData = data?.data || {};

  // Store data in local storage if new data is available
  useEffect(() => {
    if (timestamps.length > 0) {
      localStorage.setItem("heatmapData", JSON.stringify(data));
    }
  }, [data]);

  // Retrieve data from local storage if no new data is available
  const storedData =
    timestamps.length === 0
      ? JSON.parse(localStorage.getItem("heatmapData"))
      : null;
  const finalData = storedData || data || { timestamps: [], data: {} }; // Ensure finalData has default structure

  // Define headers dynamically based on the keys in the data object
  const headers = [
    "Date",
    ...Object.keys(finalData.data || {}).filter(
      (key) => key !== "_id" && key !== "TIME"
    ),
  ];

  const noDataAvailable =
    !finalData.timestamps ||
    finalData.timestamps.length === 0 ||
    (finalData.data && Object.keys(finalData.data).length === 0);

  return (
    <div className="overflow-x-auto relative w-full rounded-lg shadow-md scrollbar-custom">
      <table className="w-full text-sm font-normal text-white md:text-lg font-poppins">
        <thead className="sticky top-0 bg-[rgb(16,16,16)] z-10 rounded-lg">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-2 md:px-6 py-2 md:py-3 border rounded-md border-white ${
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
            <tr className="border-b border-white bg-[rgb(16,16,16)] w-full">
              <td
                colSpan={headers.length}
                className="px-2 md:px-6 py-2 md:py-4 text-center font-medium text-white border border-white bg-[rgb(16,16,16)] "
              >
                No data available
              </td>
            </tr>
          ) : (
            finalData.timestamps.map((timestamp, rowIndex) => {
              // Extract row data based on the headers
              const rowData = headers
                .slice(1)
                .map((header) => finalData.data[header]?.[rowIndex]);

              // Skip rendering the row if there is no data for any column
              if (rowData.every((cell) => !cell)) {
                return null;
              }

              return (
                <tr
                  key={rowIndex}
                  className="border-b border-white bg-[rgb(16,16,16)] rounded-md"
                >
                  <th
                    scope="row"
                    className="px-2 md:px-6 py-2 md:py-4 font-medium whitespace-nowrap border border-white bg-[rgb(16,16,16)] rounded-md"
                  >
                    {new Date(timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </th>
                  {headers.slice(1).map((header, colIndex) => {
                    const cellData = finalData.data[header]?.[rowIndex];

                    return (
                      <td
                        key={colIndex}
                        className={`px-2 md:px-6 py-2 md:py-4 border border-white rounded-md ${
                          colIndex % 2 === 0
                            ? "bg-[rgb(16,16,16)]"
                            : "bg-[rgb(20,20,20)]"
                        }`}
                      >
                        <span
                          className={`${
                            cellData >= 190 && cellData < 230
                              ? "text-green-400" // Light green for values between 190 and 230
                              : cellData >= 230 && cellData < 250
                              ? "text-green-600" // Dark green for values between 230 and 250
                              : cellData >= 250 && cellData < 300
                              ? "text-orange-600" // Orange for values between 250 and 300
                              : cellData >= 300 && cellData < 450
                              ? "text-red-600" // Light red for values between 300 and 450
                              : cellData > 450
                              ? "text-red-800" // Dark red for values above 450
                              : "text-white" // Default text color
                          }`}
                        >
                          {cellData || ""}{" "}
                          {/* Display cell data or an empty string */}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeatmapTable;
