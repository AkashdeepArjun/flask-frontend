import { useState,useEffect } from "react";
import api from "../api/client";
import { Link, Rss } from "lucide-react";
import { div } from "framer-motion/client";
import CartItem from "../components/CartItem";

import { useAuth } from "../context/AuthContext"

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


export default function MyCart(){


    const navigate = useNavigate()

    const { user } = useAuth()

    const {cart_products,fetch_cart,delete_from_cart,cart_id,setCartProducts,place_order} = useCart()


    const [loading,setLoading] = useState(false)

    const [cart_items,setCartItems] = useState([])

    const [error_log,setErrorLog] = useState([])

    const [order_place_state ,setOrderPlaceState] = useState(false)



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


        // e.preventDefault()
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



    const onOrderPlaced = async(e) =>{

        setOrderPlaceState(true)

        try{
        e.preventDefault()

        const response =  await place_order()


        if(response.status == "ok"){

            setCartItems([])

            navigate("/my_orders")


        }

        }catch(error){


            setErrorLog(error)



        }

        finally{
            setOrderPlaceState(false)
        }


    }

    

   /*  useEffect(()=>{

       

    },[cart_products]) */


    return (

        <div className="relative w-full h-max flex flex-col justify-between">
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

        <div className=" relative flex flex-col w-full h-max items-center justify-center">
        {cart_products.map((item)=>(
            
            <CartItem product={item} key={item.product_id} onDelete={()=>onDelete(cart_id,item.product_id) }  />

        ))}

        <button disabled={order_place_state} className="absolute bottom-1 right-1 px-2 py-1 text-slate-100 bg-cyan-950 hover:bg-cyan-400 cursor-pointer" onClick={onOrderPlaced}>Place Order</button>



        </div>




        )}
         
    
    
        



        </div>














    )

}












