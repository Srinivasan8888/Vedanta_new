import React from 'react'
import sort from "../../images/down-arrow.png";
import up from "../../images/green-arrow.png";
import down from "../../images/red-arrow.png";

const Bside = () => {
  return (
    <div className="h-[400px] md:w-[25%] md:h-auto  rounded-2xl border-[1.5px] border-white backdrop-blur-2xl bg-[rgba(16,16,16,0.7)] m-4 text-white font-poppins">
    <div className="flex justify-between">
      <p className="mt-6 ml-8 text-2xl font-semibold">B Side</p>
      <div className="relative flex items-center">
        <label htmlFor="currency" className="sr-only">
          Options
        </label>
        <select
          id="currency"
          name="currency"
          className="h-full py-0 pl-2 mr-8 text-gray-500 bg-transparent border-0 rounded-md mt-7 appearance-non pr-7 focus:outline-none sm:text-sm"
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

    <div className="max-h-[70%] overflow-y-auto">
      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA1</p>
        <p className="ml-6">213.46</p>
        <p>
          <img src={down} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA2</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA3</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA4</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA5</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA6</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA7</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>

      <div className="flex mt-5 ml-10 text-base font-light justify-evenly font-poppins">
        <p>CBTA8</p>
        <p className="ml-6">212.03</p>
        <p>
          <img src={up} alt="up green arrow" />
        </p>
      </div>
      <div className="h-[1px] mx-8 mt-3 bg-white"></div>
     
    </div>
    
  </div>
  )
}

export default Bside