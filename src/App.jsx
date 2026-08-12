import { Routes ,Route} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MyCart from "./pages/MyCart";
import Test from "./pages/Test";

import MyOrders from "./pages/MyOrders"

import OrderDetails from "./pages/OrderDetails";

function App() {

  return (

    <Routes> 
      <Route path="/" element={<Home />} />

      <Route path="/signup" element= {<Signup/>} ></Route>

      <Route path="/products/:id" element={<ProductDetail/>}/> 

      <Route path="/login" element={<Login/>}/>

      <Route path="/my_cart" element={<MyCart/>}/>

      <Route path="/tests" element ={ <Test/> }/>

      <Route path="/my_orders" element={<MyOrders/>}/>

      <Route path ="/my__order/:id" element={<OrderDetails/>}/>


    </Routes>




  )



}


export default App