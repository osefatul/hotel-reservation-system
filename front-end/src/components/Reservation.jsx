import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchingHotelRooms } from '../features/hotelSlice/hotelAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchingReservedRoomsByHotelId, updatingRoomAvailability } from '../features/roomSlice/roomAction';
import { addToCart } from '../features/cartSlice/cartSlice';

function Reservation({setOpenModal, hotelId, totalPrice, totalDays}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [messageAlert, setMessageAlert] = useState(false)
    const [selectedRoomsNumber, setSelectedRoomsNumber] = useState([]);


    const {date} = useSelector(state => state.search)
    const {user} = useSelector(state => state.login)
    const {hotelRoomsDetails, hotel} = useSelector(state => state.hotels)
    const {reservedRooms} = useSelector(state => state.rooms)


    const getDatesInRange = (startDate, endDate) => {
        //make an object of date
        const start = new Date(startDate); 
        const end = new Date (endDate);

        const dates = [];
        
        //we want to store all dates in an array. using loops, if the date is smaller or equal to end date.
        
        const date = new Date(start.getTime()); // timestamps of the start date.
        while (date <= end){
            dates.push (new Date(date).getTime()); //push current date into the array
            date.setDate(date.getDate() + 1); //Change date to next day
        }
        return dates;
    }

    const allDates = getDatesInRange(date[0].startDate, date[0].endDate);


    //find if dates are available in the reservedDates.
    const isAvailable = (currentRoomInTheLoop) => {

        if(reservedRooms.length>0){

            //first filter a reservedRoom that has current room...
            const checkRoomIdExistInReservedHotel = reservedRooms?.filter((ReservedRoom) => {
                return ReservedRoom.roomId === currentRoomInTheLoop
            })

            if(checkRoomIdExistInReservedHotel.length>0) {
                //Some: at least one reservedDates is included in the requested dates range..
                const isFound = checkRoomIdExistInReservedHotel[0].reservedDates.some((date) =>
                allDates.includes(new Date(date).getTime())
                );

                /*if the reservedDates are found in the allDates array then room is not available and value will be "true", hence isFound will be true.
                Thats why we make it "false" so it shows not available */
                return !isFound             
            }

            else return true //True as it indicates availability.
        }

        else return true;// means available...
    };



    const handleSelect = (e, roomNum) => {
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRoomsNumber(
            checked? [...selectedRoomsNumber, roomNum]: selectedRoomsNumber.filter((item)=> item !== roomNum)
        )

        setSelectedRooms(
        checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
    };


    const handleClick = async () => {
        console.log("this is room numbers", selectedRoomsNumber)
        try {
            await Promise.all(
                selectedRooms.map((roomId,index) => {
                return dispatch(updatingRoomAvailability({
                    roomId,
                    dates:allDates, 
                    reservedBy:user._id, 
                    totalPrice:totalPrice, 
                    hotel:hotel._id,
                    selectedRoomsNumber:selectedRoomsNumber[index]
                }))

            })
            );

            await dispatch(addToCart({
                hotel:hotelRoomsDetails[0].hotel,
                id:hotel._id, 
                name:hotel.name,
                title: hotel.title,
                roomPrice:hotel.cheapestPrice,
                price: totalDays*hotel.cheapestPrice*selectedRoomsNumber.length,// using this instead of totalPrice because it doesn't count days after the checkbox.
                days:totalDays,
                checkIn:new Date(date[0].startDate).getTime(),
                checkOut:new Date(date[0].endDate).getTime(),
                desc: "Hotel stay",
                type:"Stays",
                selectedRoomsNumber
            }))

            await setMessageAlert(true)

            setTimeout(()=>{
                setOpenModal(false);
                navigate("/cart")
            },3000)

        } catch (err) {
            console.log(err)
        }
    };


    useEffect(()=>{
        setTimeout(()=>{
            setMessageAlert(false)
        },3000)

    },[messageAlert])


    useEffect(()=>{
        dispatch(fetchingHotelRooms(hotelId))
        dispatch(fetchingReservedRoomsByHotelId(hotelId))
    },[])



    return (
    <div className="text-black fixed top-0 left-0 right-0 bottom-0  flex items-center justify-center bg-black  bg-opacity-70 ">
        
        <div className='h-max w-max sm:w-1/3 bg-slate-100 flex flex-col space-y-4 px-10 py-8 relative'>
            
            <div className="absolute -top-2 -right-4 w-12 flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon
                icon={faCircleXmark}
                className="h-6"
                onClick={() => setOpenModal(false)}
                />
            </div>

            {messageAlert &&
                    <p className='flex items-center justify-center text-green-800'>Successfully reserved</p>
            }

            <h1 className='font-bold'>Select your rooms:</h1>

            {hotelRoomsDetails.map(room => (
                <div className="flex justify-between items-center space-x-10 sm:space-x-6 md: space-x-2" key={room?._id}>

                    <div className="text-[12px] sm:text-[14px]">
                        <div className="rTitle ">{room?.title}</div>
                        <div className="rDesc">{room?.desc}</div>
                        <div className="rMax">
                            Max people: <b>{room?.maxPeople}</b>
                        </div>
                        <div className="font-semibold  text-[16px]">${room?.price}</div>
                    </div>

                    <div className="flex space-x-2 items-center justify-center">
                        {room?.roomNumbers.map((roomNumber) => (
                            <div key={roomNumber._id} className="flex flex-col text-[9px] items-center justify-center">
                                <label>{roomNumber?.number}</label>
                                <input
                                    type="checkbox"
                                    value={roomNumber._id}
                                    onChange={e => handleSelect(e, roomNumber.number)}
                                    disabled={!isAvailable(roomNumber._id)}//if the isAvailable === false,
                                />
                        </div>
                        ))}
                    </div>
            </div>
            ))}

            <button onClick={handleClick} className="bg-[#0071c2] text-white p-2 font-bold rounded-sm">
                Reserve Now!
            </button>


        </div>
    </div>
    )
}

export default Reservation