import { use, useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import Navbar from '../components/Navbar'

import ProductCard from '../components/ProductCard'

import { div } from 'framer-motion/client'

import api from '../api/client'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

import ProfileMenu from '../components/ProfileMenu'


function Home() {
  // const [count, setCount] = useState(0)

  const [products,setProducts] = useState([])

  const [is_loading,setLoading] = useState(true)

  const [error,setError] = useState(null);

  const [page,setPage] = useState(1)

  const [meta,setMeta] = useState({

    total_pages:1,
    
    has_prev:false,

    has_next:false

  })

  const [coords,setCoords]=useState({top:0,left:0})

  const [search_query,setQuery] = useState('')

  const [debouncedQuery,setDebouncedQuery] = useState('')

  const [suggestions,setSuggestions] = useState([])

  const [isMenuOpen,setMenuOpen] = useState(false)


  useEffect(()=>{ 
   
    const timeoutId = setTimeout(()=>{
      setDebouncedQuery(search_query)
      setPage(1)
    },500)


    return()=>clearTimeout(timeoutId)
  },[search_query])






   const fetch_products = async() =>{
    try {
      
    console.log("function called")

    setLoading(true);
    setError(null);

    let response =null;
    let res_products = null
    let res_suggestions = null
    if(debouncedQuery.trim() !== ''){  
      
      const query_parms = new URLSearchParams({
      page:page.toString,
      ...(debouncedQuery ? {search:debouncedQuery} : {})
    });


    response = await api.get(`/search-suggestions?q=${encodeURIComponent(debouncedQuery)}`)

    }else{

      
    response = await api.get(`/products?page=${page}`)

    }

    if(response.data.products) {

    
      res_products = response.data.products 

      
    }
    
    if (response.data.items){

        // suggestion have id and name 
        res_suggestions = response.data.items

        console.log("suggestions found ",res_suggestions)

        setSuggestions(res_suggestions)


    }
    
   

   

 
    if (response.data.pagination) {
      
      setMeta((old_meta)=>({

        ...old_meta,
        total_pages:response.data.pagination.total_pages,
        has_prev:response.data.pagination.has_prev,
        has_next:response.data.pagination.has_next

      }))

    }
 
    


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

  

  },[page,debouncedQuery])


  useEffect(()=>{

    console.log(" updated meta ",meta)


  },[meta])


  const onProfileClick = (state) =>{

    if (state){

      setMenuOpen(true)

    }else{

      setMenuOpen(false)
    }


  }

  const onRecieveCoords=(top,left) =>{

    // setCoords((prev)=>{...prev,{top:top,left:left}})

    
// setCoords({ top: top, left: left });

// Shorthand version (since key and variable names match):
setCoords({ top, left });


  }



  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

            <Navbar title='MeCommerce' search_query={search_query} setQuery={setQuery} suggestions={suggestions} onProfileClick={onProfileClick} onRecieveCoords={onRecieveCoords} />

      <main className='relative max-w-6xl mx-auto p-6 space-y-6'>

        
      { isMenuOpen && (<ProfileMenu style={{
      position: 'absolute',
      top: `${coords.top}px`,
      left: `${coords.left-100}px`
    }}      />) }

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
              
              <div className="flex items-center justify-between">

                <button className={`text-slate-100 p-2 rounded-lg  bg-slate-800 ${meta.has_prev ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} onClick = {() => setPage((prev) => Math.max(prev - 1, 1))}>PREV</button>
                <p className='text-slate-400 text-sm'>Page {page} of {meta.total_pages}</p>
                <button className={`text-slate-100 p-2 rounded-lg  bg-slate-800 ${ meta.has_next ?'opacity-100 cursor-pointer ' :'opacity-50 cursor-not-allowed'}`} onClick = {() => setPage((prev) => Math.min(prev + 1, meta.total_pages))}>NEXT</button>
                
                 
              </div>
      

              <div>

                    <h1 className='text-2xl font-bold'>

                      Featured Projects
                    </h1>

                    <p className='text-slate-400 text-sm mt-1'>

                        seting up things for future reference  

                     </p>



              </div>


              <div className='grid grid-cols-1  grid-rows-[200px_1fr_300px] md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out'>

                    {is_loading && Array.from({ length: 10 }).map((_, index) => (

                        <ProductCardSkeleton key={index} />
                    ))
                    } 

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

export default Home
