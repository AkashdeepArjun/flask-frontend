import React ,{useState} from "react";

import { useNavigate,Link} from "react-router-dom";

// import {signup} from useAuth
import { useAuth } from "../context/AuthContext";
import { div } from "framer-motion/client";

export default  function Signup(){

    const [username,setUsername] =useState('')
    
    const [mail,setMail] = useState('')

    const [password,setPassword] = useState('')

    const [profile_pic,setProfilePic] = useState(null)

    const [preview_url,setPreviewUrl] = useState(null)

    const [error,setError] = useState(null)

    const { signup  }   = useAuth()

    const [submitting,setSubmitting] = useState(false)

    const navigate = useNavigate()

    const handle_FileChange = (e) =>{

        const file = e.target.files[0]

        if (file){

            setProfilePic(file)
            setPreviewUrl(URL.createObjectURL(file))


        }

    }


    const handle_submit = async (e) =>{

        try{
        e.preventDefault()
        setError('')
        setSubmitting(true)

        const result = await signup(username,mail,password,profile_pic)

        if (result.status ==="ok"){

            navigate("/")
        }else{
            setError(result.message)
            
        }}catch(error){

            console.log("see the error",error)

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

                        Create Account

                    </h2>

                    <p className="text-sm mt-1 text-slate-400 ">Sign up to get  your  dream Products at your Home </p>

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

                    <div className="flex flex-col items-center gap-3">

                        <div className="relative w-24 h-24  rounded-full border-2 border-dashed bg-slate-950 border-slate-700 flex items-center justify-center overflow-hidden">

                        {preview_url? (
                            
                            <img src={preview_url} alt="profile picure preview " className="w-full h-full object-cover"></img>

                        )   
                        
                    
                        :(
                            <span className="text-3xl text-slate-500">📷</span>

                        )}




                         </div>
                         <label  className="transition-colors px-3 py-1.5 text-indigo-400 bg-slate-800 hover:bg-slate-700  hover:text-indigo-300 border border-slate-700 rounded  "  >
                        {profile_pic? 'Change Profile Picture':'Upload Profile Picture'  }

                        <input type="file" accept="image/*" name="profile_picture" required onChange={handle_FileChange} className="hidden"></input>





                         </label>
                    </div>
                        
                                                            {/* WRAPPER FOR USERNAME  */}

                    <div >
                        <label className="block text-sm font-medium mb-1 text-slate-300"> Username</label>
                        <input type="text" name="username" required value={username} onChange={(e)=>setUsername(e.target.value)} 
                        placeholder="akashdeep"

                        className="w-full rounded-lg placeholder-slate-500 border border-slate-800 bg-slate-850  text-slate-100 px-4 py-2 text-sm focus:outline-none  focus:ring-1 focus:ring-indigo-500 "
                        
                        />

                    </div>

                                                            {/* WRAPPER FOR EMAIL */}


                     <div >
                        <label className="block text-sm font-medium mb-1 text-slate-300"> EMail</label>
                        <input type="text" name="email"  required value={mail} onChange={(e)=>setMail(e.target.value)} 
                        placeholder="potato@xyz.com"

                        className="w-full rounded-lg placeholder-slate-500 border border-slate-800 bg-slate-850  text-slate-100 px-4 py-2 text-sm focus:outline-none  focus:ring-1 focus:ring-indigo-500 "
                        
                        />

                    </div>

                                                {/* WRAPPER FOR PASSWORD  */}

                     <div >
                        <label className="block text-sm font-medium mb-1 text-slate-300"> PASSWORD </label>
                        <input type="password" name="password"  required value={password} onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="******"

                        className="w-full rounded-lg placeholder-slate-500 border border-slate-800 bg-slate-850  text-slate-100 px-4 py-2 text-sm focus:outline-none  focus:ring-1 focus:ring-indigo-500 "
                        
                        />

                    </div>
                    
                    <button type="submit" disabled={submitting} 
                    
                    className="w-full mt-2 cursor-pointer rounded-lg disabled:opacity-50 bg-indigo-600 hover:bg-indigo-500 py-2.5 text-sm font-semibold"
                    
                    >


                    {submitting ? 'Creating Account.....':'Sign Up' }

 
                    
                    </button>

                    
                </form>


                <p className="text-sm text-center text-slate-400">

                        Already have account ? {' '}

                        <Link to='/login' className="text-indigo-500 font-medium hover:underline"  > Login  </Link>


                </p>
            
            
            
            










            </div>
        </div>




    )





}