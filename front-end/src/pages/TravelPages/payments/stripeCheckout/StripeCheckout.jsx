import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"
import axios from "axios";


function StripeCheckout() {

    const {user} = useSelector(state => state.login)
    const { cartItems} = useSelector(state => state.cart)


    const handleCheckout = async (e)=>{
        e.preventDefault()


        const res = await axios({
            method:"post", 
            // url:"http://localhost:8000/v1/payments" , 
            url:"https://travels-web-app.herokuapp.com/v1/payments" , 
            data:{cartItems , userId:user._id}
        })

        const {url} = res.data;
        if(url)  window.location.href = url
    }


return (
<div>
    <form action="" onSubmit={handleCheckout}>

        <div className='flex items-center justify-center mx-auto bg-[#febb02] p-1 w-[40%] cursor-pointer'>
            <motion.button
            type='submit'
            className='font-bold text-[15px]'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            >
            Proceed to checkout
            </motion.button>
        </div>

    </form>
</div>
)


}

export default StripeCheckout