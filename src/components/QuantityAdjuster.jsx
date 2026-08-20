


export default function QuantityAdjuster ({quantity,onQuantityChange,min=1,max=99}){


    const handle_increment = ()=>{
       
        if (quantity <max){
            onQuantityChange(quantity+1)
        }


    }

    const handle_decrement = () => {

 
        if (quantity > min){


            onQuantityChange(quantity-1)

        }
    }

    return (



            <div className="flex items-center border border-gray-300 rounded-md  w-max p-4 absolute top-0.5 right-0.5">

                <button  

                type="button"
                
                disabled={quantity<min}
                
                onClick={handle_decrement} 
                
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold rounded-r-md text-gray-700 disabled:opacity:50"
                
                
                >


                    -
                    
                    
                </button> 

                
                    
                        <span className="text-sm font-semibold px-4 py-1"> {quantity} </span>


           

                <button  

                type="button"
                
                disabled={quantity<min}
                
                onClick={handle_increment}
                
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold rounded-r-md text-gray-700 disabled:opacity:50"
                
                
                >


                    +
                    
                    
                </button> 




            </div>


    )




}