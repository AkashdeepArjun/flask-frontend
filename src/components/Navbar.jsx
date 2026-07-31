import React from "react";

import { Sparkles,ShieldCheck } from "lucide-react";


export default function Navbar ({title="MeCommerce"}) {

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

            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400">

                <ShieldCheck className="h-3.5 w-3.5" />
                <span> Flask Api conntected  </span>


            </div>



            






        </div>



        </header>






    )









}