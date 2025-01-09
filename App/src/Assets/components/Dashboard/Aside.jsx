import React, { useEffect, useState, useRef } from 'react';
import sort from "../../images/down-arrow.png";
import up from "../../images/green-arrow.png";
import down from "../../images/red-arrow.png";
import '../Miscellaneous/Scrollbar.css';

const Aside = ({ socketData }) => {
  const [data, setData] = useState([]);
  const previousDataRef = useRef({});

  useEffect(() => {
    // console.log("socketData received in Aside:", socketData);
    // Update data when socketData changes
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
          id: index, // Using index as id since there's no _id field
          updatedBusbarData,
        };
      });

      // console.log("Processed newData:", newData);
      setData(newData);
    }
  }, [socketData]);

  return (
    <div className="h-[400px] md:w-[25%] md:h-auto rounded-2xl border-[1.5px] border-white backdrop-blur-2xl bg-[rgba(16,16,16,0.7)] m-4 text-white font-poppins">
      <div className="flex justify-between">
        <p className="mt-6 ml-8 text-2xl font-semibold">A Side</p>
        <div className="relative flex items-center">
          <label htmlFor="currency" className="sr-only">
            Options
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full py-0 pl-2 mr-8 text-gray-500 bg-transparent border-0 rounded-md appearance-none mt-7 pr-7 focus:outline-none sm:text-sm"
            style={{
              width: "12px",
              height: "19px",
              backgroundImage: `url(${sort})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "25px",
              appearance: "none",
            }}
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>

      <div className="flex mt-5 text-lg font-normal justify-evenly font-poppins">
        <p className="pl-6">CBT Name</p>
        <p className="mr-6">Value</p>
        <p></p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="max-h-[70%] overflow-y-auto scrollbar-custom">
        {data.map((item) => (
          <React.Fragment key={item.id}>
            {item.updatedBusbarData.map(({ key, value, arrow }) => (
              <React.Fragment key={key}>
                <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
                  <p>{key}</p>
                  <p className="ml-6">{value}</p>
                  <p>
                    <img src={arrow} alt="arrow" />
                  </p>
                </div>
                <div className="h-[1px] mx-8 mt-3 bg-white"></div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Aside;
