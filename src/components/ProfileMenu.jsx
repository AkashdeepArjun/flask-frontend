import { Link } from "react-router-dom";

export default function ProfileMenu() {




return (<div className="w-48 flex flex-col items-start h-max gap-1">

        <Link to="/my_orders" className="border-b border-gray-500"><p>My Orders</p></Link>

        <Link to ="/my_cart" > <p> My Cart  </p>   </Link>

        <Link to ="/my_profile"> <p> My Profile</p>  </Link>




</div>)








}