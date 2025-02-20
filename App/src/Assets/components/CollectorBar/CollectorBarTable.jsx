import React from "react";
import "../miscellaneous/Scrollbar.css";

const CollectorBarTable = ({ data }) => {
  const tableData = Array.isArray(data?.data) ? data.data : [];


  const headers = [
    "S.no", 
    "TimeStamp", ...Object.keys(tableData[0] || {}).filter(key => key !== "createdAt")];

  return (
    <div style={{ maxHeight: "361px" }} className="overflow-x-auto md:overflow-visible">
      <table className="w-full text-sm font-normal text-white md:text-base font-poppins">
        <thead className="sticky top-0 bg-[rgb(16,16,16)] z-10 text-xs md:text-sm md:font-regular">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={`px-2 md:px-6 py-2 md:py-3 border border-white ${index % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr className="border-b border-white bg-[rgb(16,16,16)]">
              <td colSpan={headers.length} className="px-2 md:px-6 py-2 md:py-4 text-xs md:text-sm text-center font-medium text-white border border-white bg-[rgb(16,16,16)]">
                No data available
              </td>
            </tr>
          ) : (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white bg-[rgb(16,16,16)]">
                <td className="px-1 md:px-2 py-2 md:py-4 border border-white bg-[rgb(16,16,16)] text-xs md:text-sm">
                  {rowIndex + 1}
                </td>
                <td className="px-1 md:px-2 py-2 md:py-4 border border-white bg-[rgb(20,20,20)] text-xs md:text-sm">
                  {new Date(row["createdAt"]).toLocaleString()}
                </td>
                {Object.keys(row)
                  .filter((key) => key !== "createdAt")
                  .map((key, colIndex) => (
                    <td key={colIndex} className={`px-1 md:px-2 py-2 md:py-4 border border-white ${colIndex % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}>
                      <span className="text-xs text-white md:text-sm">{row[key] ? `${row[key]}°C` : "N/A"}</span>
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
