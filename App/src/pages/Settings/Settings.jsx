import React from 'react'
import bg from "../../Assets/images/bg.png";
import Sidebar from '../../Assets/Sidebar/Sidebar';

const Settings = () => {
  return (
    <div
    className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
    style={{ backgroundImage: `url(${bg})` }}
>
    <Sidebar />

<div className='text-white'>Settings</div>
    {/* <div className="md:h-[45%] md:flex  ">
        <div className='text-white'>Test aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
    <div className="md:h-[47%] md:flex">
        <div className='text-white'>Test aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div> */}
</div>
  )
}

export default Settings