import { createContext, useState, useContext, useEffect} from "react";
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/auth'
import Cookies from 'js-cookie'



export const AuthContext = createContext()



export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async  (user)=> {


        try{
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data)
            setIsAuthenticated(true)

        }

        catch(error){
            console.log(error.response.data)
            setErrors(error.response.data)
        }
       
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]); // Limpiar errores si el login es exitoso
        } catch (error) {
            console.log(error.response?.data);
            const errorData = error.response?.data;
            setErrors(Array.isArray(errorData) ? errorData : [errorData.message || "Invalid Email"]);
        }
    }


    useEffect(() => {
        if (errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }


    }, [errors])

// here, we validate user if response have got the token
// useEffect haven't got any async function
    useEffect(() =>{
    async function checklogin() {

        const cookies = Cookies.get();

        if(cookies.token){
            try{
                const res =  await verifyTokenRequest(cookies.token)
                console.log(res);
                if(res.data){
                    setIsAuthenticated(true)

                }
                else {
                    return setIsAuthenticated(false);
                }
            }
            catch(error){
                setIsAuthenticated(false)
            }
    
        }
            

        
} checklogin();}, [])

    return (
        <AuthContext.Provider value = {{signup,signin, user, isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}







