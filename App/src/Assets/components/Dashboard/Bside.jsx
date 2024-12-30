import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sort from "../../images/down-arrow.png";
import up from "../../images/green-arrow.png";
import down from "../../images/red-arrow.png";
import '../miscellaneous/Scrollbar.css';


const Bside = () => {
  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v2/getBside');
        const newData = response.data.data;

        // Compare newData with previousData to determine arrows
        const updatedPreviousData = {};
        newData.forEach(item => {
          Object.entries(item).forEach(([key, value]) => {
            if (key.startsWith("CBT")) {
              const previousValue = previousData[key] || null;
              updatedPreviousData[key] = { current: value, previous: previousValue };
            }
          });
        });

        setPreviousData(updatedPreviousData);
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch

    // Set up interval to fetch data every 500ms
    const interval = setInterval(fetchData, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Helper to determine the arrow direction
  const getArrow = (currentValue, previousValue) => {
    if (previousValue === null) {
      // Show green arrow for initial load
      return up;
    }

    // Compare the current value with the previous value
    if (parseFloat(currentValue) > parseFloat(previousValue)) {
      return up;
    }
    return down;
  };

  return (
    <div className="h-[400px] md:w-[25%] md:h-auto rounded-2xl border-[1.5px] border-white backdrop-blur-2xl bg-[rgba(16,16,16,0.7)] m-4 text-white font-poppins">
      <div className="flex justify-between">
        <p className="mt-6 ml-8 text-2xl font-semibold">B Side</p>
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
        {data.map((item) => {
          const busbarData = Object.entries(item).filter(([key]) =>
            key.startsWith("CBT")
          );
          return busbarData.map(([key, value]) => {
            const currentValue = value;
            const previousValue = previousData[key]?.previous || null;

            return (
              <React.Fragment key={`${item._id}-${key}`}>
                <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
                  <p>{key}</p>
                  <p className="ml-6">{currentValue}</p>
                  <p>
                    <img src={getArrow(currentValue, previousValue)} alt="arrow" />
                  </p>
                </div>
                <div className="h-[1px] mx-8 mt-3 bg-white"></div>
              </React.Fragment>
            );
          });
        })}
      </div>
    </div>
  );
};


export default Bside