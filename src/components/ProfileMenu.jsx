import { Link } from "react-router-dom";


import { useAuth } from "../context/AuthContext";

export default function ProfileMenu() {

   const { user,logout } = useAuth()


  const logout_user = async(e) => {

        e.preventDefault()
        const response = await logout()
        if(response.status === "ok"){

            navigate("/",{replace:true})
        }


    }


return (<div className="w-48 flex flex-col items-start h-max gap-1 bg-orange-50">

        <Link to="/my_orders" className="border-b border-gray-500 text-blue-700"><p>My Orders</p></Link>
        

        <Link to ="/my_cart" className="border-b border-gray-500 text-blue-700" > <p> My Cart  </p>   </Link>

        <Link to ="/my_profile" className="border-b border-gray-700 text-blue-700" > <p> My Profile</p>  </Link>



        {user && (<button onClick={logout_user} className="bg-emerald-900 text-slate-200 rounded-2xl px-3 py-1.75 hover:bg-blue-500 transition-colors hover:cursor-pointer" >Logout </button>)}


</div>)








}