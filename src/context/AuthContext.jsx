import {createContext,useContext,useState,useEffect} from 'react'

import api from "../api/client";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)

    // const [token,setToken] = useState(localStorage.getItem('token') || null)

    const [is_loading,setIsLoading] = useState(true) 

    useEffect(() => {
       
        const stored_user = localStorage.getItem('user')

        if(stored_user){
           
            try{
            
            setUser(JSON.parse(stored_user))
            }catch(e){
                console.log('Error parsing user from localStorage',e)
                localStorage.removeItem('user')
            }
            
            
       
        }
        setIsLoading(false)






    },[]);


    const login = async (usermail,userpassword) => {

            const formData = new FormData()
            formData.append('usermail',usermail)
            formData.append('userpassword',userpassword)

    try {   
        
        console.log("hehaaa")
        const response = await api.post('/login',formData,{headers: {
    // Explicitly set multipart/form-data for this call
    'Content-Type': 'multipart/form-data',
  },})   

        const res = response.data

        console.log(`backebnd se response aaya dekho kaaun ${res}`)

        if(res.status === 'ok'){
           
            const user_data = res.user
           
            setUser(user_data)
           
            localStorage.setItem('user',JSON.stringify(user_data))
          
            return {status:'ok',message:"login successful"}
        
        }



}catch (error) {
    
        console.log(`dekho re dekho aya eror ${error}`)
        return {status:'error',message:"login failed"}
    
    
    
    }


    }


    const signup =async (username,mail,password,profile_pic) =>{

            const formData = new FormData()
            formData.append('username',username)
            formData.append('email',mail)
            formData.append('password',password)
            if(profile_pic){

                formData.append('profile_picture',profile_pic)
            
            
            }

            console.log('--- FORM DATA PAYLOAD ---');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
                
            }

            const response = await api.post('/register',formData)

            const res = response.data
 
            const user_data = res.user

            console.log(" user aaya re ayaa re dekho kaun",user_data)
           
            setUser(user_data)
           
            localStorage.setItem('user',JSON.stringify(user_data))

            

            if(res.status === 'success'){   

                return {status:'ok',message:"signup successful"}
           
            }else{
            
                return {status:'error',message:res.reason}
           
            }

            

    }

    const logout = async()=>{

       const response = await api.get('/logout')
       if (esponse.data.status=="ok")
       {
            setUser(null)
            localStorage.removeItem('user')

       }
       



    } 
    return (
    <AuthContext.Provider value={{user,is_loading,login,signup,logout}}>


        {children}


    </AuthContext.Provider>    



    )  










};


export const useAuth=()=>useContext(AuthContext)
