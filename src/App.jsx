import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'

import ProductCard from './components/ProductCard'
import { div } from 'framer-motion/client'

import api from './api/client'

function App() {
  // const [count, setCount] = useState(0)

  const [products,setProducts] = useState([])

  const [is_loading,setLoading] = useState(true)

  const [error,setError] = useState(null);

   const fetch_products = async() =>{
    try {
      
    console.log("function called")

    setLoading(true);
    setError(null);
      
     const response = await api.get('/products')

     const res_products = response.data.products 
 

     setProducts(res_products)



    } catch (error) {

      console.log(` error found ${error}`);
      
      setLoading(false)
      
    }

    finally{
      setLoading(false)
    }

  };










  useEffect(()=>{

  
  fetch_products();

  },[])



 
  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

            <Navbar title='MeCommerce' />

      <main className='max-w-6xl mx-auto p-6 space-y-6'>

              <div>

                    <h1 className='text-2xl font-bold'>

                      Featured Projects
                    </h1>

                    <p className='text-slate-400 text-sm mt-1'>

                        seting up things for future reference  

                     </p>



              </div>


              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    { products &&    
                    
                     products.map((p)=>

                        ( 
                          
                          <ProductCard key={p.product_id} product={p}></ProductCard>

                        )
                        
                        
                        
                        )
                    
                    
                    
                    
                    }
                       




              </div> 







        





      </main>







    </div>
  )
}

export default App
