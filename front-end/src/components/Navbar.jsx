import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import {Link, useLocation} from "react-router-dom"
import { loginSuccess } from '../features/authSlice/loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminPanelMode, NotAdminPanelMode } from '../features/adminPanel/adminPanel';
import {BsFillCartFill} from "react-icons/bs"
import {FiLogOut} from "react-icons/fi"
import {MdAdminPanelSettings} from "react-icons/md"
import {BsFillCartCheckFill, BsCartPlusFill } from "react-icons/bs"
import { toast } from "react-toastify";


function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [selectOption, setSelectOption] = useState(false)


    //We get user data from localStorage as they are saved there after authentication..
    //Home page doesn't go through protected routes so it doesn't get user data from there. we need to request user data again.
    const [users, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [userToken, setUserToken] = useState(
        sessionStorage.getItem("accessJWT")
        );
    
    const {user} = useSelector(state => state.login);//we are using this to get user from redux
    const {isAdminPanel} = useSelector(state => state.adminPanelMode);
    const { cartItems } = useSelector((state) => state.cart);

    
    useEffect(() => {
        if(users && userToken) dispatch(loginSuccess(users));
    },[users,userToken ])


    const handleLogout = ()=>{
            setSelectOption(false)
            toast.warning("Logged out!", { position: "bottom-left" });
            setUser (localStorage.removeItem("user"));
            setUserToken(sessionStorage.removeItem("accessJWT"));
            document.cookie = "access_token = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            window.location.reload()
    }

    const handleAdminPanel = ()=>{
        setSelectOption(false)
        if (location.pathname.includes("admin")) {
            dispatch(NotAdminPanelMode())
            navigate("/")
        }
        else{
            dispatch(AdminPanelMode())
            navigate("/admin")
        }
    }

    return (
        <div className={`text-white sm:h-[70px] sm:h-[50px] bg-black flex flex-col justify-center ${location.pathname === "/admin" || location.pathname.includes("/admin")? "w-full pl-2 pr-8" : "w-[75%]"} mx-auto `}>

            <div className='w-full flex sm:flex-row pt-2 py-3 sm:py-7 justify-between items-center sm:items-center space-y-1 sm:space-y-0'>

                <Link to ={isAdminPanel? "/admin" : "/"}>
                    <motion.h1 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.9 }}
                        className="pt-1 sm:pt-0 font-bold sm:border-b border-amber-400 cursor-pointer hover:text-amber-400 text-xl sm:text-2xl" >
                            {location.pathname.includes("admin")? "Travel & Stay Admin Panel" : "Travel & Stay Booking System" }
                    </motion.h1>
                </Link>

                <div className='flex items-center justify-between sm:justify-center space-x-5 '>
                    
                    {user.isAdmin && (
                        <motion.h1 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.9 }}
                            className='hidden sm:flex font-bold text-green-500 border-r border-amber-400 pr-4 cursor-pointer hover:text-amber-400 text-sm sm:text-md w-max mx-auto '
                            onClick={handleAdminPanel}
                            >
                                {/* {!isAdminPanel? "Admin Panel": "T&S Home" } */}
                                {location.pathname.includes("admin")? "T&S Home" : "Admin Panel" }

                        </motion.h1>
                        )
                    }
                    
                    {userToken && user ? 
                    <div 
                        className='flex items-center justify-center cursor-pointer text-[12px] sm:text-md hover:text-amber-400 relative'>
                        
                        <img className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover' src={user.img?user.img: "https://foodforhungryminds.org/new/wp-content/uploads/2020/10/no-profile-pic.jpg"} alt="" 
                        onClick={(e) => setSelectOption(!selectOption)}
                        />
                        <div className='absolute bg-yellow-400 text-black font-bold text-[10px] sm:text-[15px] rounded-full w-3 h-3 sm:w-4 sm:h-4 top-6 -right-1 flex items-center justify-center'>
                            {cartItems? cartItems.length : 0}
                        </div>

                        {selectOption &&
                        <div className='absolute z-50 bg-white text-black -right-3 sm:right-6 top-8 sm:top-6 h-max sm:h-24 w-max sm:w-max p-2 sm:p-3 rounded-md font-bold '>
                            
                            {user.isAdmin &&
                            <motion.p
                            className='pt-1 flex sm:hidden font-bold  text-green-500 cursor-pointer hover:text-amber-400 text-[10px] sm:text-md w-max mx-auto '
                            onClick={handleAdminPanel}
                            >
                                {!isAdminPanel? 
                                
                                <div className="flex items-center pb-2 space-x-1 pr-4">
                                    <MdAdminPanelSettings/> <span>Admin Panel</span>
                                </div>:

                                <div className="flex items-center pb-2 space-x-1 pr-4">
                                T&S Home
                                </div>
                                
                                }
                            </motion.p>
                            }


                            <Link to="/cart">
                                <motion.p
                                className='flex space-x-1 items-center pb-2 text-[10px] sm:text-md'
                                onClick={(e) => setSelectOption(false)}
                                >
                                    <span>
                                        <BsCartPlusFill/>
                                    </span> 
                                    
                                    <span>
                                        Cart
                                    </span>

                                    {
                                    cartItems &&
                                    <span className='rounded-full bg-yellow-500 text-black w-3 h-3 flex items-center justify-center text-[10px] sm:text-md'>
                                    {cartItems.length}
                                    </span>
                                    }
                                </motion.p>
                            </Link>

                            <Link to="/order-history">
                                <motion.p
                                className='flex space-x-1 items-center pb-2 text-[10px] sm:text-md'
                                onClick={(e) => setSelectOption(false)}
                                >
                                    <span>
                                        <BsFillCartCheckFill/>
                                    </span> 
                                    
                                    <span>
                                        Orders History
                                    </span>

                                </motion.p>
                            </Link>


                            <motion.p
                            className='flex space-x-1 items-center pb-2 text-[10px] sm:text-md'
                            onClick = {handleLogout} 
                            >
                                <span>
                                    <FiLogOut/>
                                </span> 
                                    
                                <span>
                                    Logout
                                </span>

                            </motion.p>

                        </div>
                        }
                    </div> 
                    :
                    <div className="flex items-center justify-center space-x-4 sm:border-b w-max border-amber-400">
                        <button className="hidden sm:flex hover:text-amber-400 text-[12px] sm:text-[14px]">Register</button>
                        
                        <Link to="/login">
                        <button className="sm:flex hover:text-amber-400 text-[12px] sm:text-[14px]">Login</button>
                        </Link>
                    </div>
                    }
                
                
                </div>

            </div>

        </div>
    )
}

export default Navbar