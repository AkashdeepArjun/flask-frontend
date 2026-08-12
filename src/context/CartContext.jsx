import React,{createContext,useContext,useState,useEffect, Children} from "react";
import api from "../api/client";

const CartContext = createContext(null)


export const CartProvider =({children}) => {

    const [cart_id,setCartId] = useState([])

    const [cart_products,setCartProducts] = useState([])

    const [loading,set_loading] = useState(false) 

    const [total_items,setTotalItems] = useState(0)

    const [bill_amount,setBillamount] = useState("")



    const fetch_cart = async() =>{
// return flask.jsonify({"status":"ok", "products":items_list,"total":total}),200

    set_loading(true)
      try {const response = await api.get('/cart')

        const response_data  = response.data

        if(response_data.status === "ok"){

            setCartProducts(response_data.products)

            

            const totalItems = cart_products.reduce((sum, item) => sum + item.quantity, 0);
 
          
            setTotalItems(totalItems)
            setBillamount(response_data.total)

            setCartId(response_data.cart_id)
            
            return {status:"ok",products:response_data.products,total_bill:response_data.total }



        }else{

            setCartProducts([])


        }
    }catch(error){
        console.log(error)
        setCartProducts([])
    }

    finally{
        set_loading(false)
    }

    }


    useEffect(()=>{

        fetch_cart();

    },[])

    


    /*     return flask.jsonify({
            "status":"ok",
            "message": "Item added to cart successfully",
            "cart_item": {
                "product_id": cart_item.product_id,
                "quantity": cart_item.quantity
            }
        }), 200 */

    const add_to_cart = async(product_id,quantity) => {


        try {
            
        const response  = await api.post('/cart/add',JSON.stringify({product_id,quantity}),{ withCredentials: true })

        console.log(`respons is ${response}`)
            
        const response_data  = response.data
            
        if(response_data.status=="ok"){

            fetch_cart()
            return {status:"ok",message:"product added to cart"}
    
            
        }else{

            return {status:"failed",message:`did not added product coz of response ${response} and data ${response_data}`}
            
        }


        } catch (error) {

            return {status:"failed",message:error}
            
        }


        




    }


    const delete_from_cart = async(cart_id,product_id) =>{

        console.log(` cart id :${cart_id} and product id   ${product_id} recieved   `)

        try {

              const response = await api.post(`/cart/delete?cart_id=${cart_id}&product_id=${product_id} `)

              const real_response = response.data 

        if(real_response.status == "ok") {

            fetch_cart()
            return {status:"ok",message:"item deleted successfully"}


        }else{


            return {status:"failed",message:"item deletion failed"}


        }
            
        } catch (error) {

            return {status:"failed",message:error}

            
        }
      







    }

    const place_order = async()=> {

        try{
        const response = await api.get('/place_order')

        const unpacked_response = response.data 

        if (unpacked_response.status ==="ok"){


            return {status:"ok",message:"ordered placed successfully"}



        }else {


            return {status:"failed",reason:"could not place order"}


        }

        }catch(err){


            return {status:"failed",reason:err}

            
        }
    




    }

    







    console.log('1. CartProvider executing, loading state is:', loading);

    return (

        <CartContext.Provider value={{cart_id:cart_id,cart_products:cart_products,setCartProducts,bill_amount,add_to_cart,fetch_cart,total_items,delete_from_cart}}>

            {/* LOG 2: Place this directly inside the JSX */}
            {console.log('2. CartProvider JSX rendering, children:', children)}
            {children}
        </CartContext.Provider>


    )

}

export const  useCart = ()=>useContext(CartContext)

