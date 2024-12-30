import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import sort from "../../images/down-arrow.png";
import up from "../../images/green-arrow.png";
import down from "../../images/red-arrow.png";
import '../miscellaneous/Scrollbar.css';

const Aside = () => {
  const [data, setData] = useState([]);
  const previousDataRef = useRef({}); // To store the previous values for comparison

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v2/getAside');
        const newData = response.data.data;
    
        // Compare with previous data and update arrows
        const updatedData = newData.map((item) => {
          const previousItem = previousDataRef.current[item._id] || {};
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
                  ? up // Default to green arrow for first fetch or invalid data
                  : parsedValue > parsedPrevValue
                  ? up // Green arrow for increase
                  : down, // Red arrow for decrease
            };
          });
    
          // Save updated data for this item
          previousDataRef.current[item._id] = {
            ...Object.fromEntries(busbarData),
          };
    
          return {
            ...item,
            updatedBusbarData,
          };
        });
    
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    // Set up interval to fetch data every 500ms
    const interval = setInterval(fetchData, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
          <React.Fragment key={item._id}>
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
