import React, { useState } from "react";

import { motion } from "framer-motion";

import { ArrowUpRight,ShoppingBag } from "lucide-react";
import { div } from "framer-motion/client";

import { useCart } from "../context/CartContext";
import QuantityAdjuster from "./QuantityAdjuster";

export default function ProductCard({product}){

    const {cart_products,add_to_cart} = useCart()

    const [quantity,setQuantity]  = useState(1)

    const [addingToCart,setAddingToCart] = useState(false)

    const onQuantityChange = (q) =>{

        setQuantity(q)
    }

    const handle_add_to_cart = async() =>{

         setAddingToCart(true)
         try{
        const product_id = product.product_id
        
        const result = await add_to_cart(product_id,quantity)

        if (result.status=="ok"){

            window.alert("item aded to cart sucesfully")
        }else {

            window.alert(result.message)
        }

    }catch(error){

            console.log(error);
            

    }

    finally{
        setAddingToCart(false)
    }






    }




    return (
      

        <div className=" relative bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between ">

            <QuantityAdjuster quantity={quantity} onQuantityChange={onQuantityChange} className="absolute top-0.5 right-0.5" >

            </QuantityAdjuster>

            <p className="absolute top-0 right-3 text-gray-200">{product.product_id}</p>

            <button type="button" onClick={handle_add_to_cart}  disabled={addingToCart} className=" disabled:opacity-50 absolute bottom-0.5 right-0.5 px-3 py-1 text-md rounded-1xl bg-emerald-400 text-slate-100 transition-colors   hover:bg-purple-500  ">
                Add To Cart
            </button>

            <h3 className="text-lg font-bold text-slate-100">
              
              { product.name }


            </h3>

            <p className="text-sm text-slate-400 mt-2">
            {  product.description  }
            </p>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800">

               <span className="text-lg font-semibold text-emerald-400">
            

                    {product.price}

               </span>




            </div>



            
        </div>
    )
}