import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import api from "../api/client";

export default function OrderDetails() {


/*     
purchased_products.append({
                "product_id":product.product_id,
                "product_name":product.name,
                "quantity":item.quantity,
                "price":item.unit_price,
                "subtotal":sub_total

            })
 */


    const { id } = useParams();

    const [loading,setLoading] = useState(false)

    const [detaiil,setDetail] = useState(null)

    const [total_bill,setTotalBill] = useState(0.00)

    const fetch_detail = async()=>{

     try{   setLoading(true)

        const response  = await api.get(`/my_orders/${id}`)

        const wrapped_response = response.data
    
        if(wrapped_response.status =="ok"){

            
            setDetail(wrapped_response.order_items)

            setTotalBill(wrapped_response.total_bill)



        }
    
    
    }catch(err){
            console.log(err);
            
        }


        finally{
            setLoading(false)
        }





    }


    useEffect(()=>{

        fetch_detail()

    },[])


    return (

        <div className="relative w-full h-full bg-emerald-950 text-slate-200">

            <h1 className={`absolute top-2 right-2 border rounded-xl ${loading?'animate-spin':''}  `}>{total_bill}</h1>

            <table className="border border-collapse">
                <thead>
                    <tr> 

                        <td> 
                            <p>Product Name</p>
                        </td>
                        <td> 
                            <p>Product Price</p>
                        </td><td> 
                            <p>Product Quantity</p>
                        </td><td> 
                            <p>Product SubTotal</p>
                        </td>

                    </tr>


                </thead>

                <tbody>

                {detaiil && detaiil.map((item)=>(


                <tr className="px-4 py-2 border">
                        <td> <Link to={`/products/${item.product_id}`}> {item.product_name} </Link>   </td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.subtotal}</td>
                        

                </tr>





                ))}



                </tbody>



            </table>







        </div>



    )












    
}