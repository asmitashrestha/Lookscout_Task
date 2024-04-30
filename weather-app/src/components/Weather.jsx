import React, { useState } from 'react';
import { CiTempHigh } from "react-icons/ci";
import { CiUmbrella } from "react-icons/ci";
import { CiDroplet } from "react-icons/ci";
import Mix from "../assets/mix.jpeg"
const Weather = () => {
  

  return (
    <div>
      <div>
        <div className='flex justify-center mt-32'>
          <p className='text-gray-600 mr-2'>Right now in </p>
          <div className=''>
            <input
              type="text"
              className="border-none outline-none text-black font-bold 
              text-xl"
              style={{ marginRight: '5px' }} // Adjust spacing between input and hr
            />
            <hr/>
          </div>
          <p className='text-gray-600 ml-1'>, it's mostly cloudy</p>
        </div>

        <div className='flex justify-center mt-9'>
          <div>
            <img src={Mix} alt="mix" className='w-20 rounded-full'/>
          </div>
          <div>
            <p>99</p>
            <p>66/43</p>
          </div>
          <div className="">
            <div>
             <p><CiTempHigh /></p>
            </div>
            <div>
             <p><CiUmbrella /></p>
            </div>
            <div>
             <p><CiDroplet /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
