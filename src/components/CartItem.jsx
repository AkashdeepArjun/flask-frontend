
/*      items_list.append({
                "product_id": product.product_id,
                "name": product.name,
                "brand": product.brand,
                "price": float(product.price),
                "quantity": item.quantity,
                "image_url": product.image_url,
                "subtotal": round(sub_total, 2)
            })
 */

import { div } from "framer-motion/client";
import { DeleteIcon } from "lucide-react";
import React,{useState} from "react";

export default function CartItem({product,onDelete}){


    return(

        <div className="relative flex flex-row items-center px-4 py-2 bg-orange-100 border border-b-red-950 gap-2" >

        <h3 className="text-black ">{product.name}</h3>

        <h4 > X{product.quantity}   </h4>

        <h4>{product.brand}</h4>        

        <h4>{product.price}</h4>

        <h5>{product.subtotal}</h5>

        <DeleteIcon type="button" onClick={onDelete}> DELETE </DeleteIcon>

        
        
        
        
        </div>








        
    )






}