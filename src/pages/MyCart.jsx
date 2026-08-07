import { useState,useEffect } from "react";
import api from "../api/client";
import { Rss } from "lucide-react";
import { div } from "framer-motion/client";
import CartItem from "../components/CartItem";
export default function MyCart(){

    const [loading,setLoading] = useState(false)

    const [cart_items,setCartItems] = useState([])

    const [error_log,setErrorLog] = useState([])


    const load_cart_items = async() =>{

        setLoading(true)

        try {
            
            const response = await api.get('/cart')

            const res =response.data

            if(res.status === "ok"){

                setCartItems(res.products)
            }else{

                setCartItems([])
                setErrorLog(res.message)

            }


        } catch (error) {
            
            setCartItems([])
            setErrorLog(error)



        }

        finally{

            setLoading(false)
        }




    }

    useEffect(()=>{

        load_cart_items()

    },[])


    return (

        <div>

         <h2>My Cart section</h2>




        </div>














    )












}