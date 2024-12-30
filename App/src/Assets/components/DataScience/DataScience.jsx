import React from "react";
import bg from "../../images/bg.png";
import Sidebar from "../../Sidebar/Sidebar.jsx";

const DataScience = () => {
  return (
    <div
      className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Sidebar />

      <div className="flex  bg-[rgba(16,16,16,0.75)] h-[840px] md:h-[87%] m-4 rounded-lg border border-white flex-col ">
        <div className="md:h-[40%] h-[336px] grid grid-rows-2 bg-red-500 md:w-full rounded-tr-lg rounded-tl-lg">
          <div className="h-full bg-white">
            <div className="flex flex-col justify-between h-full py-4">
                <div>
                    <p className="mb-2 text-lg font-semibold">Collector Bar</p>
                    <div className="flex justify-between px-4">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                </div>
            </div>
          </div>
          <div className="h-full bg-white">
            <div className="flex flex-col justify-between h-full py-4">
                <div>
                    <p className="mb-2 text-lg font-semibold">Extremely Low</p>
                    <div className="flex justify-between px-4">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                       
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="md:h-[60%] h-[504px] flex bg-blue-500 md:w-full rounded-br-lg rounded-bl-lg"></div>
      </div>
    </div>
  );
};

export default DataScience;
