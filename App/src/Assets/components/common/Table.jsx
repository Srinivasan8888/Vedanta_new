import React from "react";
// import "../../miscellaneous/Scrollbar.css";
import "../../components/miscellaneous/Scrollbar.css"

const Table = ({ 
  headers, 
  data, 
  isLoading, 
  error, 
  emptyMessage = "No data available",
  onActionClick,
  actionIcon,
  actionLabel = "Action",
  showActionColumn = true,
  customRowRender,
  className = "",
  headerClassName = "bg-[#101010]/90",
  rowClassName = "border-b border-gray-700",
  cellClassName = "px-4 py-4",
  headerCellClassName = "px-4 py-3 text-center whitespace-nowrap"
}) => {
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  // Render empty state
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`scrollbar-customd overflow-x-auto ${className}`}>
      <div className="min-w-[30px] overflow-x-auto  rounded-2xl">
        <table className="w-full text-white">
          <thead className={`sticky top-0 ${headerClassName} text-base backdrop-blur-sm`}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={headerCellClassName}
                >
                  {header.label || header}
                </th>
              ))}
              {showActionColumn && (
                <th
                  scope="col"
                  className={headerCellClassName}
                >
                  {actionLabel}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {customRowRender ? (
              customRowRender(data)
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowClassName}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className={cellClassName}>
                      {row[header.id || header] || ""}
                    </td>
                  ))}
                  {showActionColumn && (
                    <td className={cellClassName}>
                      {actionIcon && (
                        <button
                          type="button"
                          onClick={() => onActionClick && onActionClick(row)}
                          className="p-2 rounded-full hover:bg-gray-700"
                        >
                          {actionIcon}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table; 