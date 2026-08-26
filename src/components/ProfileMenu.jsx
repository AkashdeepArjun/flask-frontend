import { Link } from "react-router-dom";

export default function ProfileMenu() {




return (<div className="w-48 flex flex-col items-start h-max gap-1 bg-orange-50">

        <Link to="/my_orders" className="border-b border-gray-500 text-blue-700"><p>My Orders</p></Link>

        <Link to ="/my_cart" className="border-b border-gray-500 text-blue-700" > <p> My Cart  </p>   </Link>

        <Link to ="/my_profile" className="border-b border-gray-700 text-blue-700" > <p> My Profile</p>  </Link>




</div>)








}