
import { useState } from "react"
import {useAuth} from "../context/AuthContext"
import api from "../api/client"

import { useNavigate } from "react-router-dom"


export default function MyProfile(){

    const navigate = useNavigate()

    const {user} = useAuth()

    const [state_sending_mail,setStatusSending] = useState(false)

    const [message,setMessage] = useState(null)

    const send_verification_mail = async(e) =>{

    try{

        e.preventDefault()
        setStatusSending(true)
        const response = await api.post('/send_verification', JSON.stringify({"email":user.usermail}))

        const wrapped_response = response.data 

        if(wrapped_response.success){


            setMessage("verification mail sent")
            setTimeout(()=>{

            navigate("/",{replace:true})
            
        },2000)


        }

        }catch(error){
            console.log()
        }


        finally {

            setStatusSending(false)

        }







    }



    return (

            <div className=" relative justify-self-center self-center w-full mx-4 border border-gray">



            <div className=" p-16 flex flex-row items-center justify-center">

                <h1 className="font-bold w-max">{user.usermail} </h1>

                {user && !user.is_verified && (  
                <button disabled={state_sending_mail} className="bg-amber-800 text-slate-100 w-ma" onClick={send_verification_mail} > {send_verification_mail?SENDING:VERIFY_EMAIL} </button> ) }

                {user && user.is_verified && (<h3 className="bg-green-950 text-slate-100">verified!</h3>)}
            </div>  

            {message && (
                <div className=" absolute top-4 left-4 border border-green-800 bg-slate-900 text-green-700">

                    <h2 className="text-center">{message}</h2>
                    
                
                
                </div>

            )}


            </div>








    )





}