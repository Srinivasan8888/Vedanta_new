import React from "react";
import "../Miscellaneous/Scrollbar.css";

const CollectorBarTable = ({ data }) => {
  const tableData = Array.isArray(data?.data) ? data.data : [];


  const headers = [
    "S.no", 
    "TimeStamp", ...Object.keys(tableData[0] || {}).filter(key => key !== "createdAt")];

  return (
    <div style={{ maxHeight: "361px" }}>
      <table className="w-full text-lg font-normal text-white font-poppins">
        <thead className="sticky top-0 bg-[rgb(16,16,16)] z-10">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={`px-6 py-3 border border-white ${index % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr className="border-b border-white bg-[rgb(16,16,16)]">
              <td colSpan={headers.length} className="px-6 py-4 text-center font-medium text-white border border-white bg-[rgb(16,16,16)]">
                No data available
              </td>
            </tr>
          ) : (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white bg-[rgb(16,16,16)]">
                <td className="px-2 py-4 border border-white bg-[rgb(16,16,16)]">{rowIndex + 1}</td>
                <td className="px-2 py-4 border border-white bg-[rgb(20,20,20)]">
                  {new Date(row["createdAt"]).toLocaleString()}
                </td>
                {Object.keys(row)
                  .filter((key) => key !== "createdAt")
                  .map((key, colIndex) => (
                    <td key={colIndex} className={`px-2 py-4 border border-white ${colIndex % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}>
                      <span className="text-white">{row[key] ? `${row[key]}°C` : "N/A"}</span>
                    </td>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export default CollectorBarTable;
