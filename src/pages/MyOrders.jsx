import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

import { useCart } from "../context/CartContext"
import { div } from "framer-motion/client"
import { Link } from "react-router-dom"

export default function MyOrders(){


    const {user}  = useAuth()

    const {my_orders} = useCart()

    const [orders,setOrders] = useState([])

    const [load,setLoad] = useState(false)

    const [error,setError] = useState(null)

    const get_orders = async() =>{


    try{

        setLoad(true)

        const response = await my_orders()

        if(response.status ==="ok") {

           setOrders(response.orders)


        }else{

            setError(response.reason)
        }

    }catch(error){

        setError(error)
    }

    finally{
        setLoad(false)
    }


    }


    useEffect(()=>{

        get_orders()

    },[])




    return(

        <div className={`  relative w-full h-full bg-emerald-800 justify-self-center flex items-center`}>
        
        <table className="border border-collapse">
            <thead>
                <tr>
                {/*     { orders && Object.keys(orders[0]).forEach(key => {(<th>{key}</th>)
                    
                    
                    console.log(key, obj[key]);
                    })}
 */}


                </tr>

            </thead>

            <tbody>

                {orders && orders.map((order=>(
                
                <tr className={`${load?'animate-pulse':''} border border-black `}>
                    <td className="p-2"> <Link to={`/my_order/:${order.order_id}`}>{order.order_id}</Link>   </td>

                     <td>{order.created_at}</td>   

                    <td> <h3>{order.amount}</h3>   </td>

                </tr>


                )))}



            </tbody>


        </table>
        
            



        </div>



    )







}


// export default MyOrders