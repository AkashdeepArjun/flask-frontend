import { useState,useEffect } from "react";
import api from "../api/client";
import { Link, Rss } from "lucide-react";
import { div } from "framer-motion/client";
import CartItem from "../components/CartItem";

import { useAuth } from "../context/AuthContext"

import { useCart } from "../context/CartContext";


export default function MyCart(){

    const { user } = useAuth()

    const {cart_products,fetch_cart} = useCart()


    const [loading,setLoading] = useState(false)

    const [cart_items,setCartItems] = useState([])

    const [error_log,setErrorLog] = useState([])


   




    

    useEffect(()=>{

       

    },[])


    return (

        <div className="relative w-full h-max flex flex-col  items-center justify-center">
        {!user && (
            <div className="bg-slate-100 border border-gray-500 flex items-center justify-center">


                <Link to ="/login" className="border border-sky-800 text-2xl">

                    
                    <p>Login to see the cart </p>
                
                
                </Link>




            </div>
        ) }


        {user && !cart_products && 
            (
            <div className="bg-slate-100 border border-gray-500 flex items-center justify-center">



                    
                    <p className="text-2xl font-sans  text-gray-300 ">  Cart is Empty    </p>
                
                




            </div>
        )





        }


        {user && cart_products && (

        <div className="flex w-full h-max items-center justify-center">
        {cart_products.map((item)=>(
            
            <CartItem product={item} key={item.product_id}/>

        ))}



        </div>


        )}
         




        </div>














    )

}












