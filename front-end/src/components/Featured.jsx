import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchingHotelsByCity, fetchingHotelsByType } from '../features/hotelSlice/hotelAction';

function Featured() {

  const dispatch = useDispatch();
  const {isLoading,
    error,
    HotelsInTheCities,
    } = useSelector(state => state.hotels)


  useEffect(() =>{
    dispatch(fetchingHotelsByCity())
  },[])


  return (
    <div className="w-full flex justify-between space-x-2 ">
      
      <div className="relative w-full">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="object-cover h-full w-full rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white font-bold text-[12px] space-y-2 md:text-xl lg:text-3xl">
          <h1>Vancouver</h1>
          <h2 className='text-md'>{HotelsInTheCities[0]} properties</h2>
        </div>
      
      </div>
    
      <div className="relative w-full">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="object-cover h-full w-full rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white font-bold text-[12px] space-y-2 md:text-xl lg:text-3xl">
          <h1>Kabul</h1>
          <h2>{HotelsInTheCities[1]} properties</h2>
        </div>
      </div>

      <div className="relative w-full">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="object-cover h-full w-full rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white font-bold text-[12px] space-y-2 md:text-xl lg:text-3xl">
          <h1>Richmond</h1>
          <h2>{HotelsInTheCities[2]} properties</h2>
        </div>
      </div>
  </div>
  )
}

export default Featured