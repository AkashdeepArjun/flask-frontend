import React from "react";


import { Sparkles,ShieldCheck } from "lucide-react";

import { VerifiedIcon } from "lucide-react";

import SearchBar from "./Searchbar";

import { useAuth } from "../context/AuthContext";

import { replace, useNavigate } from "react-router-dom";


export default function Navbar ({title="MeCommerce",search_query,setQuery,suggestions}) {

    const { user,logout } = useAuth()

    const navigate= useNavigate()

    const logout_user = async(e) => {

        e.preventDefault()
        const response = await logout()
        if(response.status === "ok"){

            navigate("/",{replace:true})
        }


    } 



    return(

        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b
         border-slate-800/80 px-6 py-4">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

            <div className="flex items-center gap-2">

                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">

                <Sparkles className="w-5 h-5" />

                </div>

                <span className="text-xl font-bold tracking-tight text-white">

                    {title}

                </span>








            </div>

            <div className="w-full sm:w-80">

                <SearchBar search_query={search_query} setQuery={setQuery} suggestions={suggestions} />


            </div>




            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400">

                <ShieldCheck className="h-3.5 w-3.5" />
                <span> Flask Api conntected  </span>


            </div>

                    <div className="relative w-24 h-24  rounded-full border-2 border-dashed bg-slate-950 border-slate-700 flex items-center justify-center overflow-hidden">
                        
                      {/*   {user && (
                        <div className=` {user ? "bg-emerald-400" : "bg-red-500"}` > 

                        </div>
                        )} */}


                        {user && (
                            <img
                                src={`https://www.laziakeey.in/api/static/uploads/${user.profile_url}`}
                                alt="profile img"
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* {user && (<h2 className="text-center overflow-hidden flex items-center justify-center w-full h-full bg-emerald-800 text-slate-100">Okay</h2>)} */}

                        {console.log('user value is ', user)}



                        

                    </div>

                    {user && user.is_verified && ( <VerifiedIcon  className="absolute top-0 right-0.5 w-12 h-12 " />   )}

                    

                    
                {user && (<button onClick={logout_user} className="bg-emerald-900 text-slate-200 rounded-2xl px-3 py-1.75 hover:bg-blue-500 transition-colors hover:cursor-pointer" >Logout </button>

                

                ) }

                


        </div>



        </header>






    )









}