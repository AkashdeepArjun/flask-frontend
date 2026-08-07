import { useState,useEffect } from "react";
import api from "../api/client";
export default function MyCart(){

    const [loading,setLoading] = useState(false)

    const [cart_items,setCartItems] = useState([])


    const load_cart_items = async() =>{

        setLoading(true)

        try {
            
            const response = await api.get('/cart')


        } catch (error) {
            




        }

        finally{

            setLoading(false)
        }




    }














}