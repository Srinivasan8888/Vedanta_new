import React from 'react'
import bg from "../../Assets/images/bg.png";
import Sidebar from '../../Assets/Sidebar/Sidebar';

const Report = () => {
  return (
    <div
    className="relative w-screen bg-fixed bg-center bg-cover md:h-screen md:bg-center"
    style={{ backgroundImage: `url(${bg})` }}
>
    <Sidebar />

    <div className='text-white'>Report</div>
</div>
  )
}

export default Report