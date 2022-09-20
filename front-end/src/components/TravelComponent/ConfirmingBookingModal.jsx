import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'

function ConfirmingBookingModal({setModalOpen}) {

    const {flight} = useSelector(state => state.flights)
    const { isLoading, SelectedUsersDetail} = useSelector(state => state.flightsUserDetail)


    return (
        <div className="text-black fixed top-0 left-0 right-0 bottom-0  flex items-center justify-center bg-black  bg-opacity-70 ">
            
            <div className='h-max w-max sm:w-1/3 bg-slate-100 flex flex-col space-y-4 px-10 py-8 relative'>
                
                <div className="absolute -top-2 -right-4 w-12 flex items-center justify-center cursor-pointer">
                    <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="h-6"
                    onClick={() => setModalOpen(false)}
                    />
                </div>
    
                <div className='space-y-6'>

                    <div>
                        <h1 className=' text-lg  font-bold border-b border-slate-300'>Review Details</h1>
                    </div>

                    <div className='space-y-2'>
                        <h1>Flight Details</h1>

                        <div className='text-[12px] space-y-3'>
                            <p className='w-max border-b border-b-amber-600 font-bold'>{flight.airline} {flight.code}</p>

                            <div>
                                <p>From:<span className="font-bold"> {flight.from}</span></p> 
                                <p>To:<span className="font-bold"> {flight.to}</span></p>
                                <p>To:<span className="font-bold"> ${flight.fare}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <h1>Traveler Details</h1>

                        <div className='text-[12px]'>
                                <p>Name:
                                    <span className="font-bold">{" "}
                                    {SelectedUsersDetail.firstName} {SelectedUsersDetail.lastName} 
                                    </span>
                                </p> 
                                
                                <p>Birthday:
                                    <span className="font-bold">{" "} 
                                    {new Date(SelectedUsersDetail.birthdate).toDateString()}
                                    </span>
                                </p>
                                
                        </div>
                    </div>

                    <div>
                    </div>


                </div>

            </div>

    </div>

    )

}

export default ConfirmingBookingModal