import React, { useEffect, useState, useRef } from 'react';
import sort from "../../images/down-arrow.png";
import up from "../../images/green-arrow.png";
import down from "../../images/red-arrow.png";
import '../miscellaneous/Scrollbar.css';

const BSide = ({ socketData }) => {
  const [data, setData] = useState([]);
  const previousDataRef = useRef({});

  useEffect(() => {
    if (socketData && socketData.length > 0) {
      const newData = socketData.map((item, index) => {
        const previousItem = previousDataRef.current[index] || {};
        const busbarData = Object.entries(item).filter(([key]) => key.startsWith("CBT"));

        const updatedBusbarData = busbarData.map(([key, value]) => {
          const prevValue = previousItem[key];
          const parsedValue = parseFloat(value);
          const parsedPrevValue = parseFloat(prevValue);

          return {
            key,
            value,
            arrow:
              prevValue === undefined || isNaN(parsedPrevValue) || isNaN(parsedValue)
                ? up
                : parsedValue > parsedPrevValue
                ? up
                : down,
          };
        });

        previousDataRef.current[index] = {
          ...Object.fromEntries(busbarData),
        };

        return {
          id: index,
          updatedBusbarData,
        };
      });

      setData(newData);
    }
  }, [socketData]);

  return (
    <div className="h-[400px] xl:h-[300px] 2xl:h-[93.9%] md:w-[98%] xl:w-[28%] 2xl:w-[25%] rounded-2xl border-[1.5px] border-white bg-[rgba(16,16,16,0.9)] xl:m-2 2xl:m-3 text-white font-poppins">
      <div className="flex justify-between">
        <p className="mt-6 ml-8 font-semibold xl:mt-3 xl:ml-4 xl:text-lg 2xl:mt-4 2xl:ml-6 2xl:text-xl">B Side</p>
        <div className="flex relative items-center">
          <label htmlFor="currency" className="sr-only">Options</label>
          <select
            id="currency"
            name="currency"
            className="py-0 pr-7 pl-2 mt-7 mr-8 h-full text-gray-500 bg-transparent rounded-md border-0 appearance-none xl:mr-6 xl:mt-5 focus:outline-none sm:text-sm"
            style={{
              width: "12px",
              height: "19px",
              backgroundImage: `url(${sort})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "25px",
              appearance: "none",
            }}
            disabled
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>

      <div className="flex justify-evenly mt-5 text-lg font-normal xl:mt-3 2xl:mt-5 xl:text-sm 2xl:text-base font-poppins">
        <p className="pl-6 xl:pl-3 2xl:pl-4">CBT Name</p>
        <p className="mr-6 xl:mr-3 2xl:mr-4">Value</p>
        <p></p>
      </div>
      <div className="h-[1px] mx-8 xl:mx-4 2xl:mx-6 mt-3 bg-white"></div>

      <div className="max-h-[70%] xl:max-h-[65%] 2xl:max-h-[72%] overflow-y-auto scrollbar-custom">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {item.updatedBusbarData.map(({ key, value, arrow }) => (
              <React.Fragment key={key}>
                <div className="flex justify-evenly mt-5 ml-10 text-base font-light xl:mt-3 2xl:mt-5 xl:ml-6 2xl:ml-10 xl:text-xs 2xl:text-base font-poppins">
                  <p>{key}</p>
                  <p className="ml-6 xl:ml-3 2xl:ml-6">{value} °C</p>
                  <p><img src={arrow} alt="arrow" className="xl:w-2 xl:h-2 2xl:w-4 2xl:h-4" /></p>
                </div>
                <div className="h-[1px] mx-8 xl:mx-4 2xl:mx-8 mt-3 bg-white"></div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BSide;
