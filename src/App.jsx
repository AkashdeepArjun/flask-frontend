import { Routes ,Route} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {

  return (

    <Routes> 
      <Route path="/" element={<Home />} />

      <Route path="/signup" element= {<Signup/>} ></Route>

      <Route path="/products/:id" element={<ProductDetail/>}/> 

      <Route path="/login" element={<Login/>}/>







    </Routes>




  )



}


export default App