import React from 'react'

function Catagories() {
    const cardsItems = [
        {id:1, image:"/images/home/category/img1.png", title:"Main Dish", des:"(86 dishes)"},
        {id:2, image:"/images/home/category/img2.png", title:"Break Fast", des:"(12 break fast)"},
        {id:3, image:"/images/home/category/img3.png", title:"Dessert", des:"(48 dessert)"},
        {id:4, image:"/images/home/category/img4.png", title:"Browse All", des:"(255 Items)"},
    ]
     
  return (
    
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center text-2xl'>
            <p className='text-red'>Customer Favorites</p>
            <h2 className='md:text-5xl text-4xl font-bold leading-sung'>Popular Catagories</h2>
        </div>
        <div className='flex flex-col sm:flex-row justify-around gap-8 flex-wrap items-center mt-12'>
            {
              cardsItems.map((item,i) => (
                <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10 '>
                  <div className='w-full mx-auto flex items-center justify-center'>
                    <img className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28" src={item.image} alt="image" />
                  </div>
                  <div className='mt-5 space-y-1'>
                    <h5 className='font-semibold text-[#1E1E1E]'>{item.title}</h5>
                    <p className='text-secondary text-sm'>{item.des}</p>  
                  </div>               
                </div>
              ))
            }
            
        </div>
      <div></div>
    </div>
  )
}

export default Catagories
