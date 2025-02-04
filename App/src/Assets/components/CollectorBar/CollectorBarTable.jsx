import React from "react";
import "../Miscellaneous/Scrollbar.css";

const CollectorBarTable = ({ data }) => {
  // Handle data from props, if available
  const tableData = data || [];

  // Define headers based on your data (you can dynamically generate them from the keys)
  const headers = ["S.no", "TimeStamp", ...Object.keys(tableData[0] || {}).filter(key => key !== "createdAt")];

  // Check if data is available
  const noDataAvailable = tableData.length === 0;

  return (
    <div style={{ maxHeight: '361px' }}>
      <table className="w-full text-lg font-normal text-white font-poppins">
        <thead className="sticky top-0 bg-[rgb(16,16,16)] z-10">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 border border-white ${index % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}
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
            tableData.map((row, rowIndex) => {
              const rowData = [
                rowIndex + 1, // Dynamically generate S.no based on row index
                new Date(row["createdAt"]).toLocaleString(), // Access and format timestamp from the row
                ...Object.keys(row).filter(key => key !== "createdAt").map(key => {
                  const value = row[key];
                  return value ? `${value} °C` : "N/A";
                }),
              ];

              return (
                <tr key={rowIndex} className="border-b border-white bg-[rgb(16,16,16)]">
                  {rowData.map((cellData, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 border border-white ${colIndex % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}
                    >
                      <span className={`text-white`}>
                        {cellData || ""}
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
