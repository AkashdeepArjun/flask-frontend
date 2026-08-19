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

        <div className="w-screen h-3/4 grid grid-cols-2 p-4 justify-self-center  ">

            <img src={preview_image_url} className="w-full h-full p-1 border border-slate-700 rounded-2xl"/>

            <div className="w-full h-screen grid grid-cols-3 grid-rows-3">

                {image_urls.map((l)=>{
                    <div className={`w-full h-full ${l == preview_image_url?'border border-amber-400':''}`} onClick={(e)=>{


                        setPreviewImageUrl(l)
                    }
                    } >

                        <img src={l} />
                        
                    
                     </div>
                })}


            </div>


        </div>


    )


}