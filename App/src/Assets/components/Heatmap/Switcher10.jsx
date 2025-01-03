import React, { useState } from "react";

const Switcher10 = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="relative inline-flex items-center justify-center p-1 bg-transparent border rounded-md cursor-pointer select-none themeSwitcherTwo shadow-card w-[175px] h-[55px]">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-3 px-[19px] text-sm font-medium${
            !isChecked ? "text-primary bg-[rgba(0,119,228)]" : "text-body-color"
          }`}
        >
          <p>A Side</p>
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-3 px-[19px] text-sm font-medium${
            isChecked ? "text-primary bg-[rgba(0,119,228)]" : "text-body-color"
          }`}
        >
          <p>B Side</p>
        </span>
      </label>
    </>
  );
};

export default Switcher10;
