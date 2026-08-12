import { useState,useEffect } from "react";
import api from "../api/client";
import { Link, Rss } from "lucide-react";
import { div } from "framer-motion/client";
import CartItem from "../components/CartItem";

import { useAuth } from "../context/AuthContext"

import { useCart } from "../context/CartContext";


export default function MyCart(){

    const { user } = useAuth()

    const {cart_products,fetch_cart,delete_from_cart,cart_id,setCartProducts} = useCart()


    const [loading,setLoading] = useState(false)

    const [cart_items,setCartItems] = useState([])

    const [error_log,setErrorLog] = useState([])

/* 
    const onDelete = async (cart_id,product_id) =>{


        const response = await delete_from_cart(cart_id,product_id)
        
        if(response.status=="ok"){
            fetch_cart()
        }else{

            setErrorLog(response.message)

        }



    }  */


        const onDelete = async (cart_id, product_id) => {
    try {
        const response = await delete_from_cart(cart_id, product_id);
        
        if (response.status === "ok") {
            // Remove the deleted product directly from state
            setCartProducts(prevProducts => 
                prevProducts.filter(item => item.product_id !== product_id)
            );
        } else {
            setErrorLog(response.message || response.reason);
        }
    } catch (err) {
        setErrorLog("Network error occurred");
    }
};
   


    useEffect(()=>{

        if(cart_products){
            console.log(`cart products are ${cart_products}`)
        }



    },[])

    

   /*  useEffect(()=>{

       

    },[cart_products]) */


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

        <div className="flex flex-col w-full h-max items-center justify-center">
        {cart_products.map((item)=>(
            
            <CartItem product={item} key={item.product_id} onDelete={onDelete}  />

        ))}



        </div>


        )}
         




        </div>














    )

}












