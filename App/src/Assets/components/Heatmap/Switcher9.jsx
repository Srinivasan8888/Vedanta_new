import React, { useState } from "react";

const Switcher9 = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="relative inline-flex items-center justify-center p-1 bg-transparent border rounded-md cursor-pointer select-none themeSwitcherTwo shadow-card w-[210px] h-[55px]">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex flex-row items-center space-x-[6px] rounded py-3 px-[14px] text-sm font-medium${
            !isChecked ? "text-primary bg-[rgba(0,119,228)]" : "text-body-color"
          }`}
        >
          <p>Min.Value</p>
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-3 px-[14px] text-sm font-medium ${
            isChecked ? "text-primary bg-[rgba(0,119,228)]" : "text-body-color"
          }`}
        >
          <p>Max.Value</p>
        </span>
      </label>
    </>
  );
};

export default Switcher9;
