import React ,{useState} from "react";

import { useNavigate,Link} from "react-router-dom";

// import {signup} from useAuth
import { useAuth } from "../context/AuthContext";
import { div } from "framer-motion/client";

export default  function Login(){

    // const [username,setUsername] =useState('')

/*    username=form.usermail.data
            userpassword = form.userpassword.data */

    
    const [usermail,setMail] = useState('')

    const [userpassword,setPassword] = useState('')

    // const [profile_pic,setProfilePic] = useState(null)

    // const [preview_url,setPreviewUrl] = useState(null)

    const [error,setError] = useState(null)

    const { login }   = useAuth()

    const [submitting,setSubmitting] = useState(false)

    const navigate = useNavigate()

/*     const handle_FileChange = (e) =>{

        const file = e.target.files[0]

        if (file){

            setProfilePic(file)
            setPreviewUrl(URL.createObjectURL(file))


        }

    } */


    const handle_submit = async (e) =>{

        try{
        e.preventDefault()
        setError('')
        setSubmitting(true)

        const result = await login(usermail,userpassword)

        console.log(`result is ${result}`)

        if (result && result.status ==="ok"){

            navigate("/")
        }else{
            setError(result.message)
            
        }}catch(error){

            console.log(`dekh0 errr aaya ${error} `)


        }

    
        finally{
        
            setSubmitting(false)
        
    }









    }


    return (

        <div  className="min-h-screen flex justify-center items-center bg-slate-950 p-4">

            <div className="w-full max-w-md rounded-2xl border bg-slate-900 border-slate-800 shadow-xl p-8 space-y-6">


                <div className="text-center">

                    <h2 className="text-2xl font-bold text-white"> 

                        Login

                    </h2>

                    <p className="text-sm mt-1 text-slate-400 "> Get your Products on your cart instantly</p>

                </div>


               {/* Fix: Safely handle if 'error' is a string OR an object */}
{error && (
  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm text-center">
    {typeof error === 'object' ? (
      <ul className="text-left list-disc list-inside">
        {Object.entries(error).map(([key, msg]) => (
          <li key={key}>
            <strong className="capitalize">{key}:</strong> {String(msg)}
          </li>
        ))}
      </ul>
    ) : (
      String(error)
    )}
  </div>
)} 






                <form onSubmit={handle_submit} className="space-y-4">

                                                        {/* WRAPPER FOR IMAGE UPLOAD  */}

                    
                        
                                                            {/* WRAPPER FOR USERNAME  */}

                   

                                                            {/* WRAPPER FOR EMAIL */}


                     <div >
                        <label className="block text-sm font-medium mb-1 text-slate-300"> EMail</label>
                        <input type="text" name="usermail"  required value={usermail} onChange={(e)=>setMail(e.target.value)} 
                        placeholder="potato@xyz.com"

                        className="w-full rounded-lg placeholder-slate-500 border border-slate-800 bg-slate-850  text-slate-100 px-4 py-2 text-sm focus:outline-none  focus:ring-1 focus:ring-indigo-500 "
                        
                        />

                    </div>

                                                {/* WRAPPER FOR PASSWORD  */}

                     <div >
                        <label className="block text-sm font-medium mb-1 text-slate-300"> PASSWORD </label>
                        <input type="password" name="userpassword"  required value={userpassword} onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="******"

                        className="w-full rounded-lg placeholder-slate-500 border border-slate-800 bg-slate-850  text-slate-100 px-4 py-2 text-sm focus:outline-none  focus:ring-1 focus:ring-indigo-500 "
                        
                        />

                    </div>
                    
                    <button type="submit" disabled={submitting} 
                    
                    className="w-full mt-2 cursor-pointer rounded-lg disabled:opacity-50 bg-indigo-600 hover:bg-indigo-500 py-2.5 text-sm font-semibold"
                    
                    >


                    {submitting ? 'Loggin in....':'Login' }

 
                    
                    </button>

                    
                </form>


                <p className="text-sm text-center text-slate-400">

                        New User ? {' '}

                        <Link to='/signup' className="text-indigo-500 font-medium hover:underline"  > Signup </Link>


                </p>
            
            
            
            










            </div>
        </div>




    )





}