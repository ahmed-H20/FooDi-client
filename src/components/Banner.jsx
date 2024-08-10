import React from 'react'
import { FaPlayCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        {/* Images side */}
        <div className='md:w-1/2 flex-col'>
          <img src="../../public/images/home/banner.png" alt="banner image" />
          {/* rating boxes */}
          <div className='flex items-center justify-around -mt-14 gap-4'>
            <div className='bg-white py-2 px-3 flex gap-3 shadow-md rounded-2xl w-64'>            
              <img className='rounded-2xl' src="../../public/images/home/b-food1.png" alt="food image" />
              <div>
                <p className='font-medium mb-1'>Spicy noodies</p>
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                <p><span className='text-red'>$</span> 18.00</p>
              </div>
          </div> 
          <div className='hidden md:flex bg-white py-2 px-3 gap-3 shadow-md rounded-2xl w-64'>            
              <img className='rounded-2xl' src="../../public/images/home/b-food1.png" alt="food image" />
              <div>
                <p className='font-medium mb-1'>Spicy noodies</p>
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                <p><span className='text-red'>$</span> 18.00</p>
              </div>
          </div>
          </div>              
        </div>        
        {/* Text side */}
        <div className='md:w-1/2 space-y-7'>
          <h2 className='md:text-5xl text-4xl font-bold leading-sung'>
            Dive into Delights Of Delectable <span className='text-green'>Food</span>
          </h2>
          <p className='text-xl text-[#4A4A4A]'>
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
          </p>
          <div className='space-x-5'>
            <button className='btn bg-green text-white text-md font-semibold rounded-full px-8 py-4'>Order Now</button>
            <a href="#" className='btn btn-ghost text-semibold text-md'>Watch video <FaPlayCircle /></a>

          </div>
        </div>                
      </div>
    </div>
  )
}

export default Banner
