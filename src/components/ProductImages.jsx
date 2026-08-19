import { useEffect, useState } from "react"

import api from "../api/client"
import { useParams } from "react-router-dom"

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

        <div className={`w-0.7 h-0.6 ${are_images_loading ?'animate-pulse':''}   esabsolute top-4 grif grid-cols-2  grid-rows-1 w-screen bg-gray-200 border-slate-500 rounded-2xl`}>

            
            {image_urls && (<div className="w-full max-h-full p-2 border border-b-cyan-100">

                            <img src={image_urls[0]} alt="" />
                
                
                
                        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        )}
















            
        </div>


    )


}