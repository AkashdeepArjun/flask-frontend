import React, { useEffect, useState } from "react";


import { Sparkles,ShieldCheck, LogInIcon, ShoppingCartIcon } from "lucide-react";

import { VerifiedIcon } from "lucide-react";

import SearchBar from "./Searchbar";

import { useAuth } from "../context/AuthContext";

import { Link, replace, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import ProfileMenu from "./ProfileMenu";

export default function Navbar ({title="MeCommerce",search_query,setQuery,suggestions}) {

    const { user,logout } = useAuth()

    const {isProfileMenuOpen,setProfileMenuOpened} = useState(false)

    const {cart_products,fetch_cart} = useCart()

    const navigate= useNavigate()

    const logout_user = async(e) => {

        e.preventDefault()
        const response = await logout()
        if(response.status === "ok"){

            navigate("/",{replace:true})
        }


    }
    
    useEffect(()=>{

        const handle_keydown = (e) =>{


            if(e.key=="Escape"){

            
            setProfileMenuOpened(false)


            }


        }

        window.addEventListener("keydown",handle_keydown)


    })



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
                            <div className="relative grid grid-cols-3">

                            <div className="relative w-full h-full">

                                     <img
                                        src={`https://www.laziakeey.in/static/uploads/${user.profile_url}`}
                                        alt="profile img"
                                        className="w-full h-full object-cover"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            setProfileMenuOpened(true)}}
                                    />

                                    
                                    {user.is_verified && ( <VerifiedIcon  className="absolute top-0 right-0.5 w-6 h-6 bg-emerald-500 " />   )}

                            </div>

                            # TOGGLE PROFILE MENU

                            {isProfileMenuOpen && (

                            <ProfileMenu className="absolute top-2 right-2"></ProfileMenu>

                            )}

                            



                            </div>

                        )}

                        </div>

                        {!user && (
                        <div className="w-12 h-12 flex justify-center items-center">
                            <Link to="/login" >
                            <button className="px-4 py-2 bg-blue-900 hover:bg-blue-500 text-slate-100">Login</button>
                            </Link>

                        </div>

                        )}

                            {user && (<Link to="/my_cart" className="">
                            <div className="relative flex items-center justify-center p-4" >

                                <ShoppingCartIcon className="w-12 h-12 p-2 border border-slate-200 rounded-2xl"></ShoppingCartIcon>
                            {cart_products && cart_products.length>0  && (<p className="absolute top-0 right-0 m-1 rounded-2xl bg-red-600 p-0.5 text-slate-100">{cart_products.length}</p>)}
                            </div>
                            </Link>)}



                        {/* {user && (<h2 className="text-center overflow-hidden flex items-center justify-center w-full h-full bg-emerald-800 text-slate-100">Okay</h2>)} */}

                        {console.log('user value is ', user)}



                        



                    

                    
                {user && (<button onClick={logout_user} className="bg-emerald-900 text-slate-200 rounded-2xl px-3 py-1.75 hover:bg-blue-500 transition-colors hover:cursor-pointer" >Logout </button>

                

                ) }

                


        </div>



        </header>






    )









}