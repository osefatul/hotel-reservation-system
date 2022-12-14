import React, { useEffect } from 'react'
import Navbar from "../../components/Navbar";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../components/SearchItem';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux"

import {
    faBars,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ListPageSidebar from '../../components/ListPageSidebar';
import { fetchingHotelsByDestination } from '../../features/hotelSlice/hotelAction';



function List() {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const [destination, setDestination] = useState(location.state.destination);
    
    const {isLoading,
    error,
    hotelsByDestination
    } = useSelector(state => state.hotels)

    useEffect(() =>{
        dispatch(fetchingHotelsByDestination(destination))
    },[])



    return (
    <div className='relative'>

        <div className='bg-black text-white sticky z-50 top-0 bg-black '>
            <Navbar />
            <Header type="list" />
        </div>

        <div className="flex justify-center mt-4  px-4 sm:px-0 w-full sm:w-[75%] sm:mx-auto">
            <div className="w-full flex space-x-5">
            
            {/* Sticky Sidebar left for large screens*/}
            <div className="sticky z-50 h-max top-36 hidden sm:flex">
            <ListPageSidebar
            destination={destination}
            setDestination={setDestination}

            />
            </div>
            
                {/* Sidebar Icons for small screens */}
                <div className=" sm:hidden h-[40px] bg-white text-yellow-600 relative flex items-center justify-end ">

                    {!toggle ? (
                    <FontAwesomeIcon icon={faBars} 
                    className="fixed text-black hover:text-[#519f8d] cursor-pointer ml-2 sm:mr-8 h-5 w-5"
                    onClick={() => setToggle(!toggle)}
                    />
                    ) : (
                    <motion.div 
                    className=" z-50 fixed top-50 left-40  w-[30px] h-[25px] cursor-pointer"
                    >
                    <FontAwesomeIcon icon={faCircleXmark}
                        className="w-[20px] h-[20px] "
                        onClick={() => setToggle(false)}
                    />
                    </motion.div>
                    )}

                    <div
                    className={`fixed top-40 left-0 z-40   
                    flex flex-col justify-start items-start ${
                        toggle ? "translate-x-0" : "-translate-x-80"
                    } ease-out duration-700  shadow-2xl`}
                    >
                    <ListPageSidebar
                    destination={destination}
                    setDestination={setDestination}
                    />
                    </div>
                    
                </div>


                {/*Right Side  */}
                <div className="">
                    {hotelsByDestination?.map((hotel)=>{

                    return <SearchItem hotel={hotel} key={hotel._id} />
                    
                    })}

                </div>
            
            </div>
        </div>
    </div>

    )
}

export default List