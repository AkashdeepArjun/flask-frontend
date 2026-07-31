import React from "react";

import { motion } from "framer-motion";

import { ArrowUpRight,ShoppingBag } from "lucide-react";
import { div } from "framer-motion/client";

export default function ProductCard({product}){

    return (
      

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between ">

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