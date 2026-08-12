import { div } from "framer-motion/client";

import { useParams } from "react-router-dom";

export default function OrderDetails() {



    const { id } = useParams();


    return (

        <div>

            <h1>Order detail of order number #{id}</h1>


        </div>



    )












    
}