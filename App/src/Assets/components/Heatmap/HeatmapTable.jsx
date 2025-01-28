import React, { useEffect } from "react";

const HeatmapTable = ({combinedTableData}) => {
  // Define the headers
  const headers = [
    "Date",
    "CBT1A1", "CBT2A1", "CBT3A1", "CBT4A1", "CBT5A1", "CBT6A1", "CBT7A1", "CBT8A1",
    "CBT9A1", "CBT10A1", "CBT11A1", "CBT12A1", "CBT13A1", "CBT14A1", "CBT15A1",
    "CBT16A1", "CBT17A1", "CBT18A1", "CBT19A1", "CBT20A1", "CBT21A1", "CBT22A1",
    "CBT23A1", "CBT24A1"
  ];

  useEffect (() => {
    console.log("data for table", combinedTableData)
  })

  // Define the data (20 rows of 24 columns)
  const data = Array.from({ length: 20 }, (_, rowIndex) =>
    Array.from({ length: 24 }, (_, colIndex) => 20 + colIndex)
  );

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-md">
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
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white bg-[rgb(16,16,16)]"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap border border-white bg-[rgb(16,16,16)]"
              >
                {rowIndex + 1}
              </th>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 border border-white ${colIndex % 2 === 0 ? "bg-[rgb(16,16,16)]" : "bg-[rgb(20,20,20)]"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatmapTable;