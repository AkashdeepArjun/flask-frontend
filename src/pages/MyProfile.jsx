
import { useState } from "react"
import {useAuth} from "../context/AuthContext"

export default function MyProfile(){

    const {user} = useAuth()

    const [state_sending_mail] = useState(false)



    return (

            <div className="justify-self-center self-center w-full mx-4 border border-gray">



            <div className="flex flex-row ">

                <h1 className="font-bold">{user.usermail} </h1>

                {user && !user.is_verified && (  
                <button disabled={state_sending_mail} className="bg-amber-800 text-slate-100"></button> ) }

                {user && user.is_verified && (<h3 className="bg-green-950 text-slate-100">verified!</h3>)}
            </div>  








            </div>








    )





}