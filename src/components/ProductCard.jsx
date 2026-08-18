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

                <div className="w-24 h-24 shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">

                { product.image_url && console.log(product.image_url)}

                {product.image_url ? (
                <img
      src={product.image_url}
      alt={product.title || product.name || "Product image"}
      loading="lazy"
      className="h-full w-full object-contain p-1"
      onError={(e) => {
        // Fallback if image path 404s
        e.currentTarget.onerror = null;
        e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%239ca3af' viewBox='0 0 24 24'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>";
      }}
    />
  ) : (
    <span className="text-xs text-gray-400">No Image</span>
  )}







                </div>






               <span className="text-lg font-semibold text-emerald-400">
            


                    {product.price}

               </span>




            </div>



            
        </div>
    )
}