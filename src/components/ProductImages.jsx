import { useEffect, useState } from "react"

import api from "../api/client"
import { useParams,Link } from "react-router-dom"
import { div } from "framer-motion/client"



export default function ProductImages() {



    const {product_id} = useParams()
    

    const [image_urls,setImageUrls] = useState([])

    const [preview_image_url , setPreviewImageUrl] = useState([null])

    const [are_images_loading,setImagesLoading] = useState(false)


    const [error,setError] = useState(null)





    const fetch_images = async()=>{

        try{

            setImagesLoading(true)

            const response = await api.get(`/inventory/${product_id}/images`)

            const {status,images,reason} = response.data 

            if(status ==="ok"){

                setImageUrls(images)
                setPreviewImageUrl(images[0])

            }else{

                setError(reason)
            }
            



        }catch(error){


        setError(error)

        }finally{

            setImagesLoading(false)

        }






    }

    useEffect(()=>{

        fetch_images()

    },[])




    return(

        <div className={`w-0.5 h-0.6 ${are_images_loading ?'animate-pulse':''}   esabsolute top-4 grif grid-cols-2  grid-rows-1 bg-gray-200 border-slate-500 rounded-2xl`}>

            
            <div className="w-full max-h-full p-2 border border-b-cyan-100">

                            
                    <img src={preview_image_url} alt="" />
                
                
                
            
            </div>

           

            <div className="w-full max-h-full p-2 grid grid-cols-3 grid-rows-3">

               
               {image_urls.map((l)=>(

                <div className={`w-full h-full ${l.trim() ==preview_image_url.trim()?'border border-t-amber-400':''} `} onClick={(e)=>{
                    
                    e.preventDefault()
                    setPreviewImageUrl(l)}}> 

                    <img src={l} className="w-full h-full object-contain" />




                </div>


               ))}








            </div>




        

            


















            
        </div>


    )


}